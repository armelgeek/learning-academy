/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `imageUrl` TEXT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Comments_userId_idx` ON `Comments`(`userId`);
