-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "surface" DOUBLE PRECISION NOT NULL,
    "rooms" INTEGER NOT NULL,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "floor" INTEGER,
    "furnished" BOOLEAN,
    "heating" TEXT,
    "elevator" BOOLEAN,
    "parking" BOOLEAN,
    "balcony" BOOLEAN,
    "terrace" BOOLEAN,
    "city" TEXT NOT NULL,
    "district" TEXT,
    "address" TEXT,
    "type" TEXT NOT NULL DEFAULT 'Privé',
    "dpe" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Disponible',
    "images" TEXT NOT NULL DEFAULT '[]',
    "mapLink" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "reference" TEXT NOT NULL,
    "availabilityDate" TEXT,
    "fees" DOUBLE PRECISION,
    "deposit" DOUBLE PRECISION,
    "yearBuilt" INTEGER,
    "offreDuMoment" BOOLEAN NOT NULL DEFAULT false,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_reference_key" ON "Property"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
