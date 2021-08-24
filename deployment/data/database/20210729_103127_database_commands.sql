ALTER TABLE "system$workflowinstance" ADD "canbecontinued" BOOLEAN NULL;
UPDATE "system$workflowinstance"
 SET "canbecontinued" = false;
ALTER TABLE "system$workflowinstance" ADD "canberestarted" BOOLEAN NULL;
UPDATE "system$workflowinstance"
 SET "canberestarted" = false;
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('a8e1b254-4860-401e-b5cd-152f294ca1c0', 
'0bdec1c4-0500-467e-a6f7-5ad52fda4db4', 
'CanBeRestarted', 
'canberestarted', 
10, 
0, 
'false', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('342e8b23-b0af-4c99-9cd4-08524da21bed', 
'0bdec1c4-0500-467e-a6f7-5ad52fda4db4', 
'CanBeContinued', 
'canbecontinued', 
10, 
0, 
'false', 
false);
ALTER TABLE "system$workflowcontext" ADD "changeddate" TIMESTAMP NULL;
ALTER TABLE "system$workflowcontext" ADD "system$changedby" BIGINT NULL;
ALTER TABLE "system$workflowcontext" ADD "createddate" TIMESTAMP NULL;
ALTER TABLE "system$workflowcontext" ADD "system$owner" BIGINT NULL;
CREATE INDEX "idx_system$workflowcontext_system$owner" ON "system$workflowcontext" ("system$owner" ASC,"id" ASC);
CREATE INDEX "idx_system$workflowcontext_system$changedby" ON "system$workflowcontext" ("system$changedby" ASC,"id" ASC);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('59c6f109-f666-3ab2-b29f-86f956482f61', 
'7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6', 
'createdDate', 
'createddate', 
20, 
0, 
'', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('24fe189f-1bf9-305b-ac60-05482430bbff', 
'7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6', 
'changedDate', 
'changeddate', 
20, 
0, 
'', 
false);
INSERT INTO "mendixsystem$association" ("id", 
"association_name", 
"table_name", 
"parent_entity_id", 
"child_entity_id", 
"parent_column_name", 
"child_column_name")
 VALUES ('fc14739c-3cb8-3811-9a87-cbb9e56cc5b9', 
'System.owner', 
'system$owner', 
'7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6', 
'282e2e60-88a5-469d-84a5-ba8d9151644f', 
'id', 
'system$owner');
INSERT INTO "mendixsystem$association" ("id", 
"association_name", 
"table_name", 
"parent_entity_id", 
"child_entity_id", 
"parent_column_name", 
"child_column_name")
 VALUES ('f3e3e51e-4c3a-3c17-92bc-bbaaf65afbe6', 
'System.changedBy', 
'system$changedby', 
'7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6', 
'282e2e60-88a5-469d-84a5-ba8d9151644f', 
'id', 
'system$changedby');
INSERT INTO "mendixsystem$index" ("id", 
"table_id", 
"index_name")
 VALUES ('fd025034-6f4b-3b65-a312-95affff28f0a', 
'7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6', 
'idx_system$workflowcontext_system$owner');
INSERT INTO "mendixsystem$index_column" ("index_id", 
"column_id", 
"sort_order", 
"ordinal")
 VALUES ('fd025034-6f4b-3b65-a312-95affff28f0a', 
'fc14739c-3cb8-3811-9a87-cbb9e56cc5b9', 
false, 
0);
INSERT INTO "mendixsystem$index" ("id", 
"table_id", 
"index_name")
 VALUES ('23c62a4d-db4f-3e98-8df0-1e0f1dcf0a2b', 
'7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6', 
'idx_system$workflowcontext_system$changedby');
INSERT INTO "mendixsystem$index_column" ("index_id", 
"column_id", 
"sort_order", 
"ordinal")
 VALUES ('23c62a4d-db4f-3e98-8df0-1e0f1dcf0a2b', 
'f3e3e51e-4c3a-3c17-92bc-bbaaf65afbe6', 
false, 
0);
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.2', 
"lastsyncdate" = '20210729 10:31:27';
