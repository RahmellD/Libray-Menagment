/*
  Warnings:

  - You are about to drop the column `authorId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author_name` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_authorId_fkey`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `authorId`,
    ADD COLUMN `author_name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Author`;
