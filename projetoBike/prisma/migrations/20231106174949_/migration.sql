/*
  Warnings:

  - The required column `id` was added to the `Rents` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Rents_userId_bikeId_start_key";

-- AlterTable
ALTER TABLE "Rents" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Rents_pkey" PRIMARY KEY ("id");
