/*
  Warnings:

  - You are about to drop the `Pattern` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pattern" DROP CONSTRAINT "Pattern_userId_fkey";

-- DropTable
DROP TABLE "Pattern";

-- CreateTable
CREATE TABLE "Chart" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "gridWidth" INTEGER NOT NULL DEFAULT 5,
    "gridHeight" INTEGER NOT NULL DEFAULT 5,
    "pixels" TEXT NOT NULL,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
