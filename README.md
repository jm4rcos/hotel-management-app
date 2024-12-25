# Hotel Management App

This project is a hotel management application built with Node.js, TypeScript, and Express. It provides functionalities for managing rooms, handling user authentication, and tracking check-ins and check-outs.

## Features

- **User Authentication**: Login, registration, and password recovery for employees and receptionists.
- **Room Management**: Check-in and check-out processes, room creation, and status updates.
- **Database**: Utilizes SQLite for data storage.

## Project Structure

```
hotel-management-app
├── src
│   ├── controllers          # Contains controllers for handling requests
│   ├── routes               # Defines API routes
│   ├── models               # Database models
│   ├── services             # Business logic
│   ├── database             # Database connection and migrations
│   ├── middlewares          # Middleware functions
│   ├── types                # TypeScript types and interfaces
│   ├── app.ts               # Express application setup
│   └── server.ts            # Server entry point
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd hotel-management-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the server, run:
```
npm start
```

The application will be available at `http://localhost:3000`.

## Database Setup

The application uses SQLite. Ensure that the database is set up by running the migration scripts located in `src/database/migrations/createTables.ts`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.