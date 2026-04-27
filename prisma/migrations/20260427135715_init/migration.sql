-- CreateTable
CREATE TABLE "Villa" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Villa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "villaId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "checkIn" DATE NOT NULL,
    "checkOut" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Reservation_checkIn_checkOut_idx" ON "Reservation"("checkIn", "checkOut");

-- CreateIndex
CREATE INDEX "Reservation_villaId_idx" ON "Reservation"("villaId");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_villaId_fkey" FOREIGN KEY ("villaId") REFERENCES "Villa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
