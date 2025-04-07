# HFSC Coach Hours Tracker

The Coach Hours Tracker is a web application designed to help coaching organizations efficiently record, manage, and report coaching sessions. This tool streamlines administrative tasks, ensures accurate tracking of coaching hours, and facilitates data-driven decision-making.

## Features

- **Session Logging**: Coaches can log details of their sessions, including date, duration, program type, and coach information
- **Hours Overview**: View all logged coaching hours in a organized table format
- **Export Functionality**: Export coaching data to Excel format organized by program, date and coach
- **Simple Interface**: User-friendly design for easy data entry and retrieval

## Technology Stack

- **Frontend**: React with Tailwind CSS for styling
- **Building**: Vite for fast development and optimized builds
- **Export**: XLSX library for Excel file generation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hfsc-hours-app.git
   cd hfsc-hours-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Development Plan

### Current Status

The application is in early development with basic functionality for tracking coach hours and exporting to Excel.

### Planned Enhancements

- **User Authentication**: Implementation of user login and registration
- **Role-Based Access Control**: Different permission levels for admins, coaches, and viewers
- **Dashboard**: Visual charts showing coaching hours and performance metrics
- **Advanced Reporting**: Filter and generate reports based on various parameters
- **Database Integration**: Backend with Supabase for data persistence
- **Cloud Deployment**: Hosting on Vercel for scalable deployment

## Usage

1. Enter session details (date, hours, program, coach name)
2. Click "Add Entry" to record the session
3. View all entries in the table below
4. To export data, enter the month and year, then click "Export to Excel"

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.