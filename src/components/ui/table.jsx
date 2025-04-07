import React from "react";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={`w-full border-collapse ${className || ""}`}
      {...props}
    />
  </div>
));

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={`bg-gray-50 ${className || ""}`} {...props} />
));

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={`divide-y divide-gray-200 ${className || ""}`} {...props} />
));

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`hover:bg-gray-50 ${className || ""}`}
    {...props}
  />
));

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className || ""}`}
    {...props}
  />
));

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={`px-4 py-3 whitespace-nowrap ${className || ""}`}
    {...props}
  />
));

Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableRow.displayName = "TableRow";
TableHead.displayName = "TableHead";
TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }; 