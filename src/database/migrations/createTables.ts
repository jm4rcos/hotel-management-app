import { Database } from 'sqlite3';
import { open } from 'sqlite';

const createTables = async () => {
    const db = await open({
        filename: './database/hotel_management.db',
        driver: Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('admin', 'employee'))
        );

        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bed_type TEXT NOT NULL,
            number_of_beds INTEGER NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('available', 'occupied', 'maintenance')),
            description TEXT,
            price REAL NOT NULL
        );

        CREATE TABLE IF NOT EXISTS checkins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            room_id INTEGER NOT NULL,
            checkin_time DATETIME DEFAULT CURRENT_TIMESTAMP,
            checkout_time DATETIME,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        );
    `);

    await db.close();
};

createTables().catch(console.error);