/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `CodeChallenge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CodeChallenge_id_userId_key" ON "CodeChallenge"("id", "userId");
