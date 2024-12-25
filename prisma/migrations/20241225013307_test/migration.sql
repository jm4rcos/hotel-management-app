/*
  Warnings:

  - Added the required column `number` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestId` to the `RoomHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPaid` to the `RoomHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "age" INTEGER,
    "phoneNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "bedType" TEXT NOT NULL DEFAULT 'SINGLE',
    "numberOfBeds" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'FREE',
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Room" ("bedType", "description", "id", "numberOfBeds", "price", "status") SELECT "bedType", "description", "id", "numberOfBeds", "price", "status" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_number_key" ON "Room"("number");
CREATE TABLE "new_RoomHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomId" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "checkIn" DATETIME NOT NULL,
    "checkOut" DATETIME NOT NULL,
    "totalPaid" REAL NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RoomHistory_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RoomHistory_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RoomHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RoomHistory" ("checkIn", "checkOut", "createdAt", "id", "roomId", "updatedAt", "userId") SELECT "checkIn", "checkOut", "createdAt", "id", "roomId", "updatedAt", "userId" FROM "RoomHistory";
DROP TABLE "RoomHistory";
ALTER TABLE "new_RoomHistory" RENAME TO "RoomHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
