-- CreateTable
CREATE TABLE "GoogleReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorPhoto" TEXT NOT NULL DEFAULT '',
    "authorUrl" TEXT NOT NULL DEFAULT '',
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'fr',
    "publishedAt" DATETIME NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "GoogleReview_externalId_key" ON "GoogleReview"("externalId");

-- CreateIndex
CREATE INDEX "GoogleReview_hidden_publishedAt_idx" ON "GoogleReview"("hidden", "publishedAt");
