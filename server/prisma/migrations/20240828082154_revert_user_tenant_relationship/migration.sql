/*
  Warnings:

  - You are about to drop the column `userId` on the `Tenant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tenant" DROP CONSTRAINT "Tenant_userId_fkey";

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "userId";
