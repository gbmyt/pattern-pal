/*
  Warnings:

  - Added the required column `pixels` to the `Pattern` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pattern" ADD COLUMN     "pixels" TEXT NOT NULL,
ALTER COLUMN "gridWidth" SET DEFAULT 5,
ALTER COLUMN "gridHeight" SET DEFAULT 5;
