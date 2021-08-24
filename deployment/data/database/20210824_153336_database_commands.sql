ALTER TABLE "datagrid$datagrid" RENAME TO "3ac39f10e60d4faf86720997b922ac06";
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = '576bb057-5d49-44bd-862a-aca143d088b8';
DELETE FROM "mendixsystem$entityidentifier" 
 WHERE "id" = '576bb057-5d49-44bd-862a-aca143d088b8';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = '576bb057-5d49-44bd-862a-aca143d088b8');
DELETE FROM "mendixsystem$remote_primary_key" 
 WHERE "entity_id" = '576bb057-5d49-44bd-862a-aca143d088b8';
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = '576bb057-5d49-44bd-862a-aca143d088b8';
DROP TABLE "3ac39f10e60d4faf86720997b922ac06";
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.2', 
"lastsyncdate" = '20210824 15:33:36';
