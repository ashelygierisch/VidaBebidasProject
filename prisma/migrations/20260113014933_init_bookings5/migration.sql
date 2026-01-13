-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "confirmWaiver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "electronicSignature" TEXT,
ADD COLUMN     "waiverSignedAt" TIMESTAMP(3),
ADD COLUMN     "waiverVersion" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "waiverSignedAt" TIMESTAMP(3);
