/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Tenant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
