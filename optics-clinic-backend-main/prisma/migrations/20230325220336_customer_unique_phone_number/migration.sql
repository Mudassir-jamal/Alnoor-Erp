/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_number_key" ON "Customer"("phone_number");
