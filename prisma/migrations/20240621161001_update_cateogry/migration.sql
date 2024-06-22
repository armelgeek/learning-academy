/*
  Warnings:

  - You are about to drop the column `levelId` on the `SubCategory` table. All the data in the column will be lost.
  - Made the column `categoryId` on table `SubCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_levelId_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_subCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `SubCategory` DROP FOREIGN KEY `SubCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `SubCategory` DROP FOREIGN KEY `SubCategory_levelId_fkey`;

-- DropIndex
DROP INDEX `SubCategory_name_key` ON `SubCategory`;

-- AlterTable
ALTER TABLE `Course` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `SubCategory` DROP COLUMN `levelId`,
    MODIFY `categoryId` VARCHAR(191) NOT NULL;
