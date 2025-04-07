
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import * as XLSX from 'xlsx';

const programs = [
  "Tuesday Club", "Tuesday L2S", "Thursday Club", "Thursday L2S",
  "Therapeutic", "Sunday Adult", "Sunday Club", "Sunday L2S"
];

export default function CoachHoursTracker() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ date: '', hours: '', program: '', coach: '' });
  const [monthYear, setMonthYear] = useState({ month: '', year: '' });

  const addEntry = () => {
    if (!form.date || !form.hours || !form.program || !form.coach) return;
    setEntries([...entries, { ...form, hours: parseFloat(form.hours) }]);
    setForm({ date: '', hours: '', program: '', coach: '' });
  };

  const exportToExcel = () => {
    const coaches = [...new Set(entries.map(e => e.coach))];
    const structured = {};

    programs.forEach(p => {
      structured[p] = {};
    });

    entries.forEach(({ date, hours, program, coach }) => {
      if (!structured[program][date]) structured[program][date] = {};
      structured[program][date][coach] = (structured[program][date][coach] || 0) + hours;
    });

    const rows = [];
    rows.push(['', ...coaches]);

    programs.forEach(program => {
      rows.push([program]);
      const dates = Object.keys(structured[program]).sort();
      dates.forEach(date => {
        const row = [date];
        coaches.forEach(coach => {
          row.push(structured[program][date][coach] || '');
        });
        rows.push(row);
      });
      const totalRow = [''];
      coaches.forEach(coach => {
        const total = dates.reduce((acc, date) => acc + (structured[program][date][coach] || 0), 0);
        totalRow.push(total > 0 ? parseFloat(total.toFixed(2)) : '');
      });
      rows.push(totalRow);
    });

    const grandTotal = ['Grand Total'];
    coaches.forEach(coach => {
      const total = programs.reduce((acc, program) => {
        return acc + Object.values(structured[program]).reduce((sum, day) => sum + (day[coach] || 0), 0);
      }, 0);
      grandTotal.push(parseFloat(total.toFixed(2)));
    });
    rows.push(grandTotal);

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${monthYear.month}_${monthYear.year}`);
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HFSC_Hours_${monthYear.month}_${monthYear.year}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-center">HFSC Coach Hours Tracker</h1>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Date" />
            <Input type="text" value={form.hours} onChange={e => setForm({ ...form, hours: e.target.value })} placeholder="Hours (e.g., 1.5)" />
            <Select value={form.program} onValueChange={value => setForm({ ...form, program: value })}>
              <SelectTrigger><SelectValue placeholder="Program" /></SelectTrigger>
              <SelectContent>{programs.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
            <Input value={form.coach} onChange={e => setForm({ ...form, coach: e.target.value })} placeholder="Coach Name" />
          </div>
          <div className="flex justify-end">
            <Button onClick={addEntry}>Add Entry</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Coach</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, idx) => (
                <TableRow key={idx}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.hours}</TableCell>
                  <TableCell>{entry.program}</TableCell>
                  <TableCell>{entry.coach}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col sm:flex-row items-center gap-4 pt-6">
          <Input className="w-full sm:w-40" placeholder="Month (e.g., March)" value={monthYear.month} onChange={e => setMonthYear({ ...monthYear, month: e.target.value })} />
          <Input className="w-full sm:w-32" placeholder="Year (e.g., 2025)" value={monthYear.year} onChange={e => setMonthYear({ ...monthYear, year: e.target.value })} />
          <Button onClick={exportToExcel} className="w-full sm:w-auto">Export to Excel</Button>
        </CardContent>
      </Card>
    </div>
  );
}
