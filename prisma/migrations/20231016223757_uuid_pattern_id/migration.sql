/*
  Warnings:

  - The primary key for the `Pattern` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `Pattern` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Pattern` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pattern" DROP CONSTRAINT "Pattern_pkey",
DROP COLUMN "content",
DROP COLUMN "published",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "Pattern_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pattern_id_seq";
