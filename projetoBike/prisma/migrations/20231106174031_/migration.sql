/*
  Warnings:

  - You are about to drop the column `position` on the `Bike` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Bike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Bike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bike" DROP COLUMN "position",
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "longitude" TEXT NOT NULL;
