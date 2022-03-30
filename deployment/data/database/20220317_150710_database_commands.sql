ALTER TABLE "system$workflowsystemtask" RENAME TO "766e331234b449cab19879e612e3f592";
ALTER TABLE "system$workflowsystemtask_workflow" DROP CONSTRAINT "uniq_system$workflowsystemtask_workflow_system$workflowsystemtaskid";
DROP INDEX "idx_system$workflowsystemtask_workflow_system$workflow_system$workflowsystemtask";
ALTER TABLE "system$workflowsystemtask_workflow" RENAME TO "e1dea1484ec7403c86f413064b6da888";
ALTER TABLE "system$workflowactivity_workflowsystemtask" DROP CONSTRAINT "uniq_system$workflowactivity_workflowsystemtask_system$workflowactivityid";
DROP INDEX "idx_system$workflowactivity_workflowsystemtask_system$workflowsystemtask_system$workflowactivity";
ALTER TABLE "system$workflowactivity_workflowsystemtask" RENAME TO "a56c0895bd3e41b49fc9892b9356c708";
ALTER TABLE "system$user" ADD "blockedsince" TIMESTAMP NULL;
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('5b1e816f-0495-4baa-9d21-f1e779923898', 
'282e2e60-88a5-469d-84a5-ba8d9151644f', 
'BlockedSince', 
'blockedsince', 
20, 
0, 
'', 
false);
ALTER TABLE "system$workflow" ADD "objectid" BIGINT NULL;
UPDATE "system$workflow"
 SET "objectid" = 0;
UPDATE "mendixsystem$attribute"
 SET "entity_id" = '2ae37bf5-ecb8-4c55-b967-d7383925b208', 
"attribute_name" = 'State', 
"column_name" = 'state', 
"type" = 40, 
"length" = 12, 
"default_value" = 'InProgress', 
"is_auto_number" = false
 WHERE "id" = 'ec48ea64-d4ae-42dd-8fbe-6c3716181dc7';
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('e8722447-9692-4c59-8a28-153a4f6ebddb', 
'2ae37bf5-ecb8-4c55-b967-d7383925b208', 
'ObjectId', 
'objectid', 
4, 
0, 
'0', 
false);
ALTER TABLE "system$workflowusertask" DROP COLUMN "reason";
ALTER TABLE "system$workflowusertask" DROP COLUMN "outcomemodelguid";
DELETE FROM "mendixsystem$attribute" 
 WHERE "id" = '1f680c7a-7bca-4188-9ecd-184da0768b82';
DELETE FROM "mendixsystem$attribute" 
 WHERE "id" = '653e72c3-2fa4-471c-b0c7-829c5a939e99';
UPDATE "mendixsystem$attribute"
 SET "entity_id" = '3729d27c-735b-457a-b210-9dffb125c3f3', 
"attribute_name" = 'State', 
"column_name" = 'state', 
"type" = 40, 
"length" = 10, 
"default_value" = 'Created', 
"is_auto_number" = false
 WHERE "id" = 'f87a5a98-730e-4c57-b6c4-ae09cd057e65';
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = '87758885-664a-408c-91c4-36139c291545';
DELETE FROM "mendixsystem$entityidentifier" 
 WHERE "id" = '87758885-664a-408c-91c4-36139c291545';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = '87758885-664a-408c-91c4-36139c291545');
DELETE FROM "mendixsystem$remote_primary_key" 
 WHERE "entity_id" = '87758885-664a-408c-91c4-36139c291545';
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = '87758885-664a-408c-91c4-36139c291545';
DELETE FROM "mendixsystem$association" 
 WHERE "id" = '0bbc01af-7337-438a-ba7d-663ce015a628';
DELETE FROM "mendixsystem$unique_constraint" 
 WHERE "name" = 'uniq_system$workflowsystemtask_workflow_system$workflowsystemtaskid' AND "column_id" = '99ba8e62-bf5c-306b-b025-2228f5af23e4';
ALTER TABLE "system$workflowactivity" ADD "outcomemodelguid" VARCHAR_IGNORECASE(36) NULL;
ALTER TABLE "system$workflowactivity" ADD "outcome" VARCHAR_IGNORECASE(200) NULL;
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('a23daff4-8363-47ea-862f-4c85a29929a2', 
'a5952592-bb2c-4798-9805-f9ff91ad97de', 
'Outcome', 
'outcome', 
30, 
200, 
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
 VALUES ('c39dca31-4f4a-4e52-a633-aa7840fd0894', 
'a5952592-bb2c-4798-9805-f9ff91ad97de', 
'OutcomeModelGUID', 
'outcomemodelguid', 
30, 
36, 
'', 
false);
DELETE FROM "mendixsystem$association" 
 WHERE "id" = '1c3ed941-33a5-4a5f-b758-f1102a775851';
DELETE FROM "mendixsystem$unique_constraint" 
 WHERE "name" = 'uniq_system$workflowactivity_workflowsystemtask_system$workflowactivityid' AND "column_id" = 'd650d326-7825-30cd-a9a3-04296af6e810';
ALTER TABLE "myfirstmodule$datapoint" ADD "date" TIMESTAMP NULL;
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('1f84bab5-3199-4d29-bacf-d0565b843b41', 
'bd40486c-246b-4d24-9fb0-cafd4e5d2b59', 
'date', 
'date', 
20, 
0, 
'', 
false);
ALTER TABLE "system$queuedtask" ADD "startat" TIMESTAMP NULL;
ALTER TABLE "system$queuedtask" ADD "retry" VARCHAR_IGNORECASE(200) NULL;
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('9b8a26f0-39d8-4419-b064-c58a60be8578', 
'c6c131c8-8779-4213-9b26-a64e141f26a8', 
'StartAt', 
'startat', 
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
 VALUES ('a5c75f55-38b4-4061-a674-5cca84850223', 
'c6c131c8-8779-4213-9b26-a64e141f26a8', 
'Retry', 
'retry', 
30, 
200, 
'', 
false);
ALTER TABLE "system$processedqueuetask" ADD "finished" TIMESTAMP NULL;
ALTER TABLE "system$processedqueuetask" ADD "duration" BIGINT NULL;
ALTER TABLE "system$processedqueuetask" ADD "startat" TIMESTAMP NULL;
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('2b58adc9-b35a-4803-912d-e376a3ad89c9', 
'eb5c32a1-85ec-49d1-8bca-ecca779cd539', 
'StartAt', 
'startat', 
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
 VALUES ('f4f115ad-2bb9-4452-9bfb-f666afdebbb4', 
'eb5c32a1-85ec-49d1-8bca-ecca779cd539', 
'Finished', 
'finished', 
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
 VALUES ('6dab51ec-3ecc-43ac-a8d1-ba6815ad0fd7', 
'eb5c32a1-85ec-49d1-8bca-ecca779cd539', 
'Duration', 
'duration', 
4, 
0, 
'', 
false);
CREATE TABLE "system$workflowactivity_taskactor" (
	"system$workflowactivityid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityid","system$userid"),
	CONSTRAINT "uniq_system$workflowactivity_taskactor_system$workflowactivityid" UNIQUE ("system$workflowactivityid"));
CREATE INDEX "idx_system$workflowactivity_taskactor_system$user_system$workflowactivity" ON "system$workflowactivity_taskactor" ("system$userid" ASC,"system$workflowactivityid" ASC);
INSERT INTO "mendixsystem$association" ("id", 
"association_name", 
"table_name", 
"parent_entity_id", 
"child_entity_id", 
"parent_column_name", 
"child_column_name", 
"index_name")
 VALUES ('63446029-b863-4c07-ab91-22219be89b70', 
'System.WorkflowActivity_TaskActor', 
'system$workflowactivity_taskactor', 
'a5952592-bb2c-4798-9805-f9ff91ad97de', 
'282e2e60-88a5-469d-84a5-ba8d9151644f', 
'system$workflowactivityid', 
'system$userid', 
'idx_system$workflowactivity_taskactor_system$user_system$workflowactivity');
INSERT INTO "mendixsystem$unique_constraint" ("name", 
"table_id", 
"column_id")
 VALUES ('uniq_system$workflowactivity_taskactor_system$workflowactivityid', 
'63446029-b863-4c07-ab91-22219be89b70', 
'38f7a539-d2df-398f-99b4-047c6f7ff859');
DROP TABLE "766e331234b449cab19879e612e3f592";
DROP TABLE "e1dea1484ec7403c86f413064b6da888";
DROP TABLE "a56c0895bd3e41b49fc9892b9356c708";
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.2', 
"lastsyncdate" = '20220317 15:07:10';