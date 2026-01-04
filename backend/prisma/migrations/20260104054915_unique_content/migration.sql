/*
  Warnings:

  - A unique constraint covering the columns `[userId,link]` on the table `Content` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Content_userId_link_key" ON "Content"("userId", "link");
