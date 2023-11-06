-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bike" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "bodysize" DOUBLE PRECISION NOT NULL,
    "maxLoad" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "ratings" DOUBLE PRECISION NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Bike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rents" (
    "userId" TEXT NOT NULL,
    "bikeId" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ImageURLS" (
    "id" TEXT NOT NULL,
    "bikeId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ImageURLS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Rents_userId_bikeId_start_key" ON "Rents"("userId", "bikeId", "start");

-- AddForeignKey
ALTER TABLE "Rents" ADD CONSTRAINT "Rents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rents" ADD CONSTRAINT "Rents_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageURLS" ADD CONSTRAINT "ImageURLS_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
