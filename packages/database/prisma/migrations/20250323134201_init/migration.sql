-- CreateEnum
CREATE TYPE "Sexs" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "AgeGroupNames" AS ENUM ('BABY', 'YOUNG', 'ADULT', 'OLD');

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "sex" "Sexs" NOT NULL,
    "castred" BOOLEAN NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "age" "AgeGroupNames" NOT NULL,
    "description" TEXT NOT NULL,
    "adopted" BOOLEAN NOT NULL,
    "categoryId" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
