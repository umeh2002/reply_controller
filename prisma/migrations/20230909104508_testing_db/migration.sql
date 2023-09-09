-- CreateTable
CREATE TABLE "replyModel" (
    "id" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "replyModel_pkey" PRIMARY KEY ("id")
);
