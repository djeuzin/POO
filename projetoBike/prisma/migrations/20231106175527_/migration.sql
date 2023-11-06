/*
  Warnings:

  - You are about to drop the column `userId` on the `Rents` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Rents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rents" DROP CONSTRAINT "Rents_userId_fkey";

-- AlterTable
ALTER TABLE "Rents" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Rents" ADD CONSTRAINT "Rents_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
