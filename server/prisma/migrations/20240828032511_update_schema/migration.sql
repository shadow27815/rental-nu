/*
  Warnings:

  - The `status` column on the `Tenant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TenantStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "status",
ADD COLUMN     "status" "TenantStatus" NOT NULL DEFAULT 'PENDING';
