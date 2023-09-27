/*
  Warnings:

  - Added the required column `done` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` ADD COLUMN `done` BOOLEAN NOT NULL;
