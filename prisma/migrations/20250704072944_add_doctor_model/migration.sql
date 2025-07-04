/*
  Warnings:

  - You are about to drop the column `doctorAssigned` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "doctorAssigned",
ADD COLUMN     "doctorAssignedId" INTEGER;

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_doctorAssignedId_fkey" FOREIGN KEY ("doctorAssignedId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
