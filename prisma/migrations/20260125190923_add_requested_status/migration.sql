-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'REQUESTED';

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "requiresStaffConfirmation" BOOLEAN NOT NULL DEFAULT false;
