-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bedType" TEXT NOT NULL DEFAULT 'SINGLE',
    "numberOfBeds" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'FREE',
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_Room" ("bedType", "description", "id", "numberOfBeds", "price", "status") SELECT "bedType", "description", "id", "numberOfBeds", "price", "status" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
