ALTER TABLE "system$workflowinstance" ADD "previousstate" VARCHAR_IGNORECASE(12) NULL;
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('92d0685a-6517-4178-a83a-399fed0eee2b', 
'0bdec1c4-0500-467e-a6f7-5ad52fda4db4', 
'PreviousState', 
'previousstate', 
40, 
12, 
'', 
false);
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.2', 
"lastsyncdate" = '20210819 11:32:01';
