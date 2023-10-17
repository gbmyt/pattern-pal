-- CreateTable
CREATE TABLE "Pattern" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT false,
    "gridWidth" INTEGER NOT NULL DEFAULT 25,
    "gridHeight" INTEGER NOT NULL DEFAULT 25,

    CONSTRAINT "Pattern_pkey" PRIMARY KEY ("id")
);
