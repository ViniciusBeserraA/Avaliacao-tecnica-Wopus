/*
  Warnings:

  - The values [TO_DO,IN_PROGRESS,DONE] on the enum `TaskStatusEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatusEnum_new" AS ENUM ('PENDENTE', 'EM_PROGRESSO', 'CONCLUIDA');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatusEnum_new" USING ("status"::text::"TaskStatusEnum_new");
ALTER TYPE "TaskStatusEnum" RENAME TO "TaskStatusEnum_old";
ALTER TYPE "TaskStatusEnum_new" RENAME TO "TaskStatusEnum";
DROP TYPE "TaskStatusEnum_old";
COMMIT;
