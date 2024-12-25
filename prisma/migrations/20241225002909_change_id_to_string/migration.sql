/*
  Warnings:

  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RoomHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bedType" TEXT NOT NULL DEFAULT 'SOLTEIRO',
    "numberOfBeds" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DISPONIVEL',
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_Room" ("bedType", "description", "id", "numberOfBeds", "price", "status") SELECT "bedType", "description", "id", "numberOfBeds", "price", "status" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE TABLE "new_RoomHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "checkIn" DATETIME NOT NULL,
    "checkOut" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_RoomHistory" ("checkIn", "checkOut", "createdAt", "id", "roomId", "updatedAt", "userId") SELECT "checkIn", "checkOut", "createdAt", "id", "roomId", "updatedAt", "userId" FROM "RoomHistory";
DROP TABLE "RoomHistory";
ALTER TABLE "new_RoomHistory" RENAME TO "RoomHistory";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'EMPLOYEE'
);
INSERT INTO "new_User" ("id", "password", "role", "username") SELECT "id", "password", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
