ALTER TABLE "system$workflowinstance" DROP COLUMN "previousstate";
DELETE FROM "mendixsystem$attribute" 
 WHERE "id" = '92d0685a-6517-4178-a83a-399fed0eee2b';
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.2', 
"lastsyncdate" = '20210824 15:31:59';
