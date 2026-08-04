ALTER TABLE "system$workflowdefinition_currentworkflowversion" DROP CONSTRAINT "uniq_system$workflowdefinition_currentworkflowversion_system$workflowdefinitionid";
DROP INDEX "idx_system$workflowdefinition_currentworkflowversion_system$workflowversion_system$workflowdefinition";
ALTER TABLE "system$workflowdefinition_currentworkflowversion" RENAME TO "1f7e6e6bc4544ff7888b624b40244845";
ALTER TABLE "system$workflowversion_workflowdefinition" DROP CONSTRAINT "uniq_system$workflowversion_workflowdefinition_system$workflowversionid";
DROP INDEX "idx_system$workflowversion_workflowdefinition_system$workflowdefinition_system$workflowversion";
ALTER TABLE "system$workflowversion_workflowdefinition" RENAME TO "79547fa0f7fa4e9582efa0fb2e3328f0";
ALTER TABLE "system$workflowversion_previousversion" DROP CONSTRAINT "uniq_system$workflowversion_previousversion_system$workflowversionid1";
DROP INDEX "idx_system$workflowversion_previousversion_system$workflowversion_system$workflowversion";
ALTER TABLE "system$workflowversion_previousversion" RENAME TO "356e2f996b5d498b90cd55ae5462cc16";
DROP INDEX "idx_system$workflowversion_taskdefinition_system$workflowtaskdefinition_system$workflowversion";
ALTER TABLE "system$workflowversion_taskdefinition" RENAME TO "e21391cef98644dbbd6cf7d53c564866";
ALTER TABLE "system$workflowinstance_workflowcontext" DROP CONSTRAINT "uniq_system$workflowinstance_workflowcontext_system$workflowinstanceid";
ALTER TABLE "system$workflowinstance_workflowcontext" DROP CONSTRAINT "uniq_system$workflowinstance_workflowcontext_system$workflowcontextid";
DROP INDEX "idx_system$workflowinstance_workflowcontext_system$workflowcontext_system$workflowinstance";
ALTER TABLE "system$workflowinstance_workflowcontext" RENAME TO "72edefa59afc4c99a1ba9a12cd3a7b7c";
ALTER TABLE "system$workflowinstance_workflowdefinition" DROP CONSTRAINT "uniq_system$workflowinstance_workflowdefinition_system$workflowinstanceid";
DROP INDEX "idx_system$workflowinstance_workflowdefinition_system$workflowdefinition_system$workflowinstance";
ALTER TABLE "system$workflowinstance_workflowdefinition" RENAME TO "87aeff87d7ec4eae9a2b0ed8d0bd8a8c";
DROP INDEX "idx_system$workflowinstance_currentactivity_system$workflowactivity_system$workflowinstance";
ALTER TABLE "system$workflowinstance_currentactivity" RENAME TO "6af20c8b6d954196a86d60faa29ab1aa";
ALTER TABLE "system$taskinstance_taskdefinition" DROP CONSTRAINT "uniq_system$taskinstance_taskdefinition_system$workflowtaskinstanceid";
DROP INDEX "idx_system$taskinstance_taskdefinition_system$workflowtaskdefinition_system$workflowtaskinstance";
ALTER TABLE "system$taskinstance_taskdefinition" RENAME TO "c962d0d3987f4737a8e76f4f7ac3d7b3";
ALTER TABLE "system$taskinstance_workflowinstance" DROP CONSTRAINT "uniq_system$taskinstance_workflowinstance_system$workflowtaskinstanceid";
DROP INDEX "idx_system$taskinstance_workflowinstance_system$workflowinstance_system$workflowtaskinstance";
ALTER TABLE "system$taskinstance_workflowinstance" RENAME TO "5e3bb0558d23443bae1f89f134094d92";
DROP INDEX "idx_system$workflowusertask_targetusers_system$user_system$workflowusertask";
ALTER TABLE "system$workflowusertask_targetusers" RENAME TO "2d5bcc61cfc24874ab0848e496c4296f";
ALTER TABLE "system$workflowusertask_assignee" DROP CONSTRAINT "uniq_system$workflowusertask_assignee_system$workflowusertaskid";
DROP INDEX "idx_system$workflowusertask_assignee_system$user_system$workflowusertask";
ALTER TABLE "system$workflowusertask_assignee" RENAME TO "18362ffd1d8f47edac87ef1825d376b1";
ALTER TABLE "system$workflowactivity_taskinstance" DROP CONSTRAINT "uniq_system$workflowactivity_taskinstance_system$workflowactivityid";
DROP INDEX "idx_system$workflowactivity_taskinstance_system$workflowtaskinstance_system$workflowactivity";
ALTER TABLE "system$workflowactivity_taskinstance" RENAME TO "bccd09a1d4e444398505954d3eb2397b";
ALTER TABLE "system$workflowactivity_workflowversion" DROP CONSTRAINT "uniq_system$workflowactivity_workflowversion_system$workflowactivityid";
DROP INDEX "idx_system$workflowactivity_workflowversion_system$workflowversion_system$workflowactivity";
ALTER TABLE "system$workflowactivity_workflowversion" RENAME TO "9d72fa85b8db46b1baa533c2885c2e24";
ALTER TABLE "system$workflowactivity_workflowinstance" DROP CONSTRAINT "uniq_system$workflowactivity_workflowinstance_system$workflowactivityid";
DROP INDEX "idx_system$workflowactivity_workflowinstance_system$workflowinstance_system$workflowactivity";
ALTER TABLE "system$workflowactivity_workflowinstance" RENAME TO "5c6d5d2386de4e7187f28c08061c56e7";
DROP INDEX "idx_system$workflowactivity_previousactivity_system$workflowactivity_system$workflowactivity";
ALTER TABLE "system$workflowactivity_previousactivity" RENAME TO "44ca06a6e20d4c779f2248dc50fe0dfe";
ALTER TABLE "system$taskdefinition_workflowdefinition" DROP CONSTRAINT "uniq_system$taskdefinition_workflowdefinition_system$workflowtaskdefinitionid";
DROP INDEX "idx_system$taskdefinition_workflowdefinition_system$workflowdefinition_system$workflowtaskdefinition";
ALTER TABLE "system$taskdefinition_workflowdefinition" RENAME TO "fa96d6e7623045f6ab0ca6307178e65d";
ALTER TABLE "system$workflowdefinition" DROP CONSTRAINT "uniq_system$workflowdefinition_modelguid";
ALTER TABLE "system$workflowdefinition" RENAME TO "88a4e3a49adc43eab72e6b7439fb941e";
ALTER TABLE "system$workflowversion" RENAME TO "39821552a04b4bf28220d4b0cf7d4f6a";
DROP INDEX "idx_system$workflowinstance_system$owner";
ALTER TABLE "system$workflowinstance" RENAME TO "299d99a8022149aaaff84c5a094c03fc";
ALTER TABLE "system$workflowsystemtask" RENAME TO "b5c5b267a13a417abe1e01d82e564c63";
DROP INDEX "idx_system$workflowcontext_system$changedby";
DROP INDEX "idx_system$workflowcontext_system$owner";
ALTER TABLE "system$workflowcontext" RENAME TO "fdf32555a59b4d6c8a8dd425a14d3474";
DROP INDEX "idx_system$workflowtaskinstance_submetaobjectname_asc";
ALTER TABLE "system$workflowtaskinstance" RENAME TO "f615992650dc444d9c0678ab2aa6fff5";
ALTER TABLE "system$workflowusertask" RENAME TO "f600f850bcd1499290dc6dd9a89cded2";
ALTER TABLE "system$workflowactivity" RENAME TO "f54334b9f6d44a74abdfe3902465d63b";
ALTER TABLE "system$workflowtaskdefinition" RENAME TO "5a8f06b8163e431a9d6a0193a88bc9fa";
ALTER TABLE "system$databrokerentitymetadata" RENAME TO "c49cb44e391741798aad161dccc17c6b";
DELETE FROM "mendixsystem$entity"  WHERE "id" = '02d51bf5-6fad-4d53-868d-9366732968c1';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '02d51bf5-6fad-4d53-868d-9366732968c1';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '02d51bf5-6fad-4d53-868d-9366732968c1' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '02d51bf5-6fad-4d53-868d-9366732968c1';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '02d51bf5-6fad-4d53-868d-9366732968c1';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowdefinition_modelguid' AND "column_id" = 'a0c664f6-b514-4150-891e-34583eddeca0';
DELETE FROM "mendixsystem$entity"  WHERE "id" = '06501a2e-a29e-4e42-bb99-3b45be716079';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '06501a2e-a29e-4e42-bb99-3b45be716079';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '06501a2e-a29e-4e42-bb99-3b45be716079' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '06501a2e-a29e-4e42-bb99-3b45be716079';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '06501a2e-a29e-4e42-bb99-3b45be716079';
DELETE FROM "mendixsystem$entity"  WHERE "id" = '0bdec1c4-0500-467e-a6f7-5ad52fda4db4';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '0bdec1c4-0500-467e-a6f7-5ad52fda4db4';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '0bdec1c4-0500-467e-a6f7-5ad52fda4db4' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '0bdec1c4-0500-467e-a6f7-5ad52fda4db4';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '0bdec1c4-0500-467e-a6f7-5ad52fda4db4';
DELETE FROM "mendixsystem$index"  WHERE "table_id" = '0bdec1c4-0500-467e-a6f7-5ad52fda4db4';
DELETE FROM "mendixsystem$index_column"  WHERE "index_id" IN ('542c9489-d67c-3520-a6ff-82ad35f37fb5');
DELETE FROM "mendixsystem$association"  WHERE "id" = '3501d53b-7e89-3a04-b928-6c4c6dd7f450';
ALTER TABLE "system$user" ADD "blockedsince" TIMESTAMP NULL;
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('5b1e816f-0495-4baa-9d21-f1e779923898', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'BlockedSince', 'blockedsince', 20, 0, '', false);
ALTER TABLE "system$image" ADD "enablecaching" BOOLEAN NULL;
UPDATE "system$image" SET "enablecaching" = true;
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('0a5f1064-838e-4b91-a9c3-904428d203d2', '37827192-315d-4ab6-85b8-f626f866ea76', 'EnableCaching', 'enablecaching', 10, 0, 'true', false);
DELETE FROM "mendixsystem$entity"  WHERE "id" = '4153f6f9-12c8-4327-b48b-76d7d3398d2d';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '4153f6f9-12c8-4327-b48b-76d7d3398d2d';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '4153f6f9-12c8-4327-b48b-76d7d3398d2d' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '4153f6f9-12c8-4327-b48b-76d7d3398d2d';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '4153f6f9-12c8-4327-b48b-76d7d3398d2d';
DELETE FROM "mendixsystem$entity"  WHERE "id" = '7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6';
DELETE FROM "mendixsystem$index"  WHERE "table_id" = '7b69d5b8-cb94-4ffa-920d-e4d70c6be1e6';
DELETE FROM "mendixsystem$index_column"  WHERE "index_id" IN ('23c62a4d-db4f-3e98-8df0-1e0f1dcf0a2b', 'fd025034-6f4b-3b65-a312-95affff28f0a');
DELETE FROM "mendixsystem$association"  WHERE "id" = 'f3e3e51e-4c3a-3c17-92bc-bbaaf65afbe6';
DELETE FROM "mendixsystem$association"  WHERE "id" = 'fc14739c-3cb8-3811-9a87-cbb9e56cc5b9';
DELETE FROM "mendixsystem$entity"  WHERE "id" = '7f3cb3af-a16f-4cfd-b738-b2f3a8535ecb';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '7f3cb3af-a16f-4cfd-b738-b2f3a8535ecb';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '7f3cb3af-a16f-4cfd-b738-b2f3a8535ecb' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '7f3cb3af-a16f-4cfd-b738-b2f3a8535ecb';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '7f3cb3af-a16f-4cfd-b738-b2f3a8535ecb';
DELETE FROM "mendixsystem$index"  WHERE "table_id" = '7f3cb3af-a16f-4cfd-b738-b2f3a8535ecb';
DELETE FROM "mendixsystem$index_column"  WHERE "index_id" IN ('95714520-72f9-3b67-be29-9a0b26275af7');
DELETE FROM "mendixsystem$entity"  WHERE "id" = '8a736dc8-91c1-48fd-bc12-57920ea8f046';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '8a736dc8-91c1-48fd-bc12-57920ea8f046';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '8a736dc8-91c1-48fd-bc12-57920ea8f046' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '8a736dc8-91c1-48fd-bc12-57920ea8f046';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '8a736dc8-91c1-48fd-bc12-57920ea8f046';
DELETE FROM "mendixsystem$entity"  WHERE "id" = '8ac1e90e-718e-4aba-9942-59820582d7a7';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '8ac1e90e-718e-4aba-9942-59820582d7a7';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '8ac1e90e-718e-4aba-9942-59820582d7a7' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '8ac1e90e-718e-4aba-9942-59820582d7a7';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '8ac1e90e-718e-4aba-9942-59820582d7a7';
DELETE FROM "mendixsystem$entity"  WHERE "id" = '8d213f93-202b-42f7-9ee8-149e6f49ebb4';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '8d213f93-202b-42f7-9ee8-149e6f49ebb4';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '8d213f93-202b-42f7-9ee8-149e6f49ebb4' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '8d213f93-202b-42f7-9ee8-149e6f49ebb4';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '8d213f93-202b-42f7-9ee8-149e6f49ebb4';
ALTER TABLE "system$queuedtask" ADD "contextdata" VARCHAR_IGNORECASE(2147483647) NULL;
ALTER TABLE "system$queuedtask" ADD "system$owner" BIGINT NULL;
ALTER TABLE "system$queuedtask" ADD "scheduledeventname" VARCHAR_IGNORECASE(200) NULL;
ALTER TABLE "system$queuedtask" ADD "retry" VARCHAR_IGNORECASE(200) NULL;
ALTER TABLE "system$queuedtask" ADD "contexttype" VARCHAR_IGNORECASE(14) NULL;
ALTER TABLE "system$queuedtask" ADD "startat" TIMESTAMP NULL;
CREATE INDEX "idx_system$queuedtask_system$owner" ON "system$queuedtask" ("system$owner" ASC,"id" ASC);
CREATE INDEX "idx_system$queuedtask_queueid_asc_sequence_asc" ON "system$queuedtask" ("queueid" ASC,"sequence" ASC,"id" ASC);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('d6288735-aea7-416a-91d2-1735aa7c0ea3', 'c6c131c8-8779-4213-9b26-a64e141f26a8', 'ContextType', 'contexttype', 40, 14, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('6534293a-7a10-451c-8b3d-a689d3a281f3', 'c6c131c8-8779-4213-9b26-a64e141f26a8', 'ContextData', 'contextdata', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('9b8a26f0-39d8-4419-b064-c58a60be8578', 'c6c131c8-8779-4213-9b26-a64e141f26a8', 'StartAt', 'startat', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('a5c75f55-38b4-4061-a674-5cca84850223', 'c6c131c8-8779-4213-9b26-a64e141f26a8', 'Retry', 'retry', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('1cb5f39d-db9c-4f70-ac6a-ee3c5f5a1dcf', 'c6c131c8-8779-4213-9b26-a64e141f26a8', 'ScheduledEventName', 'scheduledeventname', 30, 200, '', false);
INSERT INTO "mendixsystem$index" ("id", "table_id", "index_name") VALUES ('8de203bb-c0c1-349b-8aef-037cdb0cd348', 'c6c131c8-8779-4213-9b26-a64e141f26a8', 'idx_system$queuedtask_system$owner');
INSERT INTO "mendixsystem$index_column" ("index_id", "column_id", "sort_order", "ordinal") VALUES ('8de203bb-c0c1-349b-8aef-037cdb0cd348', 'f6de554a-f765-3d80-aa59-2b3da4167137', false, 0);
INSERT INTO "mendixsystem$index" ("id", "table_id", "index_name") VALUES ('0eb7513a-a55e-4145-922a-1856104655f7', 'c6c131c8-8779-4213-9b26-a64e141f26a8', 'idx_system$queuedtask_queueid_asc_sequence_asc');
INSERT INTO "mendixsystem$index_column" ("index_id", "column_id", "sort_order", "ordinal") VALUES ('0eb7513a-a55e-4145-922a-1856104655f7', '77f66f6e-3794-4338-8a7d-eb4538dcd6db', false, 0);
INSERT INTO "mendixsystem$index_column" ("index_id", "column_id", "sort_order", "ordinal") VALUES ('0eb7513a-a55e-4145-922a-1856104655f7', 'd26c3f20-7dc5-4a65-bbf6-c84ec5b5fe9f', false, 1);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "storage_format") VALUES ('f6de554a-f765-3d80-aa59-2b3da4167137', 'System.owner', 'system$queuedtask', 'c6c131c8-8779-4213-9b26-a64e141f26a8', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'id', 'system$owner', 1);
DELETE FROM "mendixsystem$entity"  WHERE "id" = 'df86cd1e-f9ac-42d4-bcd0-a185540a247a';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = 'df86cd1e-f9ac-42d4-bcd0-a185540a247a';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = 'df86cd1e-f9ac-42d4-bcd0-a185540a247a' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = 'df86cd1e-f9ac-42d4-bcd0-a185540a247a';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = 'df86cd1e-f9ac-42d4-bcd0-a185540a247a';
ALTER TABLE "system$processedqueuetask" ADD "contextdata" VARCHAR_IGNORECASE(2147483647) NULL;
ALTER TABLE "system$processedqueuetask" ADD "duration" BIGINT NULL;
ALTER TABLE "system$processedqueuetask" ADD "system$owner" BIGINT NULL;
ALTER TABLE "system$processedqueuetask" ADD "finished" TIMESTAMP NULL;
ALTER TABLE "system$processedqueuetask" ADD "scheduledeventname" VARCHAR_IGNORECASE(200) NULL;
ALTER TABLE "system$processedqueuetask" ADD "contexttype" VARCHAR_IGNORECASE(14) NULL;
ALTER TABLE "system$processedqueuetask" ADD "startat" TIMESTAMP NULL;
CREATE INDEX "idx_system$processedqueuetask_system$owner" ON "system$processedqueuetask" ("system$owner" ASC,"id" ASC);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('8e8e6dfa-87a2-413a-89c1-a2b23037b792', 'eb5c32a1-85ec-49d1-8bca-ecca779cd539', 'ContextType', 'contexttype', 40, 14, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('7cbcf835-1193-4d91-84f5-40bde9ddb9e4', 'eb5c32a1-85ec-49d1-8bca-ecca779cd539', 'ContextData', 'contextdata', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('2b58adc9-b35a-4803-912d-e376a3ad89c9', 'eb5c32a1-85ec-49d1-8bca-ecca779cd539', 'StartAt', 'startat', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('f4f115ad-2bb9-4452-9bfb-f666afdebbb4', 'eb5c32a1-85ec-49d1-8bca-ecca779cd539', 'Finished', 'finished', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('6dab51ec-3ecc-43ac-a8d1-ba6815ad0fd7', 'eb5c32a1-85ec-49d1-8bca-ecca779cd539', 'Duration', 'duration', 4, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('526fe440-6d73-4c41-8f72-e5b5b4f2641e', 'eb5c32a1-85ec-49d1-8bca-ecca779cd539', 'ScheduledEventName', 'scheduledeventname', 30, 200, '', false);
INSERT INTO "mendixsystem$index" ("id", "table_id", "index_name") VALUES ('a28ff41f-1610-3353-9957-9e8d776b805e', 'eb5c32a1-85ec-49d1-8bca-ecca779cd539', 'idx_system$processedqueuetask_system$owner');
INSERT INTO "mendixsystem$index_column" ("index_id", "column_id", "sort_order", "ordinal") VALUES ('a28ff41f-1610-3353-9957-9e8d776b805e', '2a2739dd-9160-3616-8999-a7a147bf4cda', false, 0);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "storage_format") VALUES ('2a2739dd-9160-3616-8999-a7a147bf4cda', 'System.owner', 'system$processedqueuetask', 'eb5c32a1-85ec-49d1-8bca-ecca779cd539', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'id', 'system$owner', 1);
CREATE TABLE "datawidgets$datagrid" (
	"id" BIGINT NOT NULL,
	"stringattribute" VARCHAR_IGNORECASE(200) NULL,
	"numberattribute" DECIMAL(28, 8) NULL,
	"dateattribute" TIMESTAMP NULL,
	"enumattribute" VARCHAR_IGNORECASE(9) NULL,
	"booleanattribute" BOOLEAN NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('6b52e324-be13-4a7d-b3d6-3296661033de', 'DataWidgets.DataGrid', 'datawidgets$datagrid', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('108ade09-0491-4316-b527-f9d7b718ca2c', '6b52e324-be13-4a7d-b3d6-3296661033de', 'StringAttribute', 'stringattribute', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('5a6c428f-e547-47dd-8915-a1a2ea51c02e', '6b52e324-be13-4a7d-b3d6-3296661033de', 'NumberAttribute', 'numberattribute', 5, 8, '0', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('66af147e-1854-4acd-8219-e8ab12d35fd0', '6b52e324-be13-4a7d-b3d6-3296661033de', 'DateAttribute', 'dateattribute', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('df29de68-071c-48a6-8558-1fa122f6bc6d', '6b52e324-be13-4a7d-b3d6-3296661033de', 'EnumAttribute', 'enumattribute', 40, 9, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('e49ef48e-2d5f-4075-80d9-77b3dfd67ebd', '6b52e324-be13-4a7d-b3d6-3296661033de', 'BooleanAttribute', 'booleanattribute', 10, 0, 'false', false);
CREATE TABLE "system$workflowactivity" (
	"id" BIGINT NOT NULL,
	"modelguid" VARCHAR_IGNORECASE(36) NULL,
	"activityguid" VARCHAR_IGNORECASE(36) NULL,
	"caption" VARCHAR_IGNORECASE(2147483647) NULL,
	"detailsjson" VARCHAR_IGNORECASE(2147483647) NULL,
	"state" VARCHAR_IGNORECASE(9) NULL,
	"starttime" TIMESTAMP NULL,
	"endtime" TIMESTAMP NULL,
	"actiontime" TIMESTAMP NULL,
	"reason" VARCHAR_IGNORECASE(2147483647) NULL,
	"activityhash" VARCHAR_IGNORECASE(200) NULL,
	"isderivedactivity" BOOLEAN NULL,
	"outcome" VARCHAR_IGNORECASE(200) NULL,
	"outcomemodelguid" VARCHAR_IGNORECASE(36) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('a5952592-bb2c-4798-9805-f9ff91ad97de', 'System.WorkflowActivity', 'system$workflowactivity', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('941e921b-8935-402e-9d93-7894c5cc9164', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'ModelGUID', 'modelguid', 30, 36, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('11384083-d925-4b16-a625-60af27227bb4', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'ActivityGUID', 'activityguid', 30, 36, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('3236d0ea-2456-447a-b2ff-fc3b10a6ddb2', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'Caption', 'caption', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('f3e0983a-dbe5-4287-af2d-9f455e847851', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'DetailsJson', 'detailsjson', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('b0f8b9bd-f006-43a3-9c9f-edb70cd1642c', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'State', 'state', 40, 9, 'Started', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('1c9a62fd-2e39-4fd3-92a4-748940ae67ba', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'StartTime', 'starttime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('dc169e92-887a-4fc5-a21e-51d99b41314b', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'EndTime', 'endtime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('431cc58a-fc36-427b-82e5-0751fc5fce22', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'ActionTime', 'actiontime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('3b8d6bea-dfb5-497b-b2ad-c423efbd66eb', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'Reason', 'reason', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('84cfff18-42dc-4442-b783-3ca923fcde81', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'ActivityHash', 'activityhash', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('cace349b-8e30-437e-95df-c4fd4225490d', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'IsDerivedActivity', 'isderivedactivity', 10, 0, 'false', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('a23daff4-8363-47ea-862f-4c85a29929a2', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'Outcome', 'outcome', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('c39dca31-4f4a-4e52-a633-aa7840fd0894', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'OutcomeModelGUID', 'outcomemodelguid', 30, 36, '', false);
CREATE TABLE "system$cdcsnapshotstore" (
	"id" BIGINT NOT NULL,
	"entity" VARCHAR_IGNORECASE(200) NULL,
	"topic" VARCHAR_IGNORECASE(200) NULL,
	PRIMARY KEY("id"));
CREATE INDEX "idx_system$cdcsnapshotstore_entity_asc" ON "system$cdcsnapshotstore" ("entity" ASC,"id" ASC);
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('7b35b2d0-ef16-4283-b3f4-3045044c1b9e', 'System.CdcSnapshotStore', 'system$cdcsnapshotstore', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('d36fa4d3-8bb0-419f-a0dd-c171d9a4363e', '7b35b2d0-ef16-4283-b3f4-3045044c1b9e', 'entity', 'entity', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('07515807-1801-4d79-baee-77f587a065d3', '7b35b2d0-ef16-4283-b3f4-3045044c1b9e', 'topic', 'topic', 30, 200, '', false);
INSERT INTO "mendixsystem$index" ("id", "table_id", "index_name") VALUES ('6247c59f-e0d1-44a0-8fc2-4442b4165314', '7b35b2d0-ef16-4283-b3f4-3045044c1b9e', 'idx_system$cdcsnapshotstore_entity_asc');
INSERT INTO "mendixsystem$index_column" ("index_id", "column_id", "sort_order", "ordinal") VALUES ('6247c59f-e0d1-44a0-8fc2-4442b4165314', 'd36fa4d3-8bb0-419f-a0dd-c171d9a4363e', false, 0);
CREATE TABLE "system$changehash" (
	"id" BIGINT NOT NULL,
	"objectid" BIGINT NULL,
	"attribute" VARCHAR_IGNORECASE(200) NULL,
	"hash" VARCHAR_IGNORECASE(200) NULL,
	"createddate" TIMESTAMP NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('24f72d72-3c66-46e4-a08b-09daf0f451d8', 'System.ChangeHash', 'system$changehash', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('47b5e625-85c7-431f-8aaa-3d1e532287f9', '24f72d72-3c66-46e4-a08b-09daf0f451d8', 'ObjectId', 'objectid', 4, 0, '0', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('28dc5eba-42c6-4602-ac97-35eda6b366b0', '24f72d72-3c66-46e4-a08b-09daf0f451d8', 'Attribute', 'attribute', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('a142f7d6-8ed6-4753-8706-d5938e9879aa', '24f72d72-3c66-46e4-a08b-09daf0f451d8', 'Hash', 'hash', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('13f98cae-7256-37ee-a5de-fdb7aa36e8b5', '24f72d72-3c66-46e4-a08b-09daf0f451d8', 'createdDate', 'createddate', 20, 0, '', false);
CREATE TABLE "system$workflowversion" (
	"id" BIGINT NOT NULL,
	"versionhash" VARCHAR_IGNORECASE(200) NULL,
	"modeljson" VARCHAR_IGNORECASE(2147483647) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('30834a21-e81c-4cbf-a10b-5f60f5fddc82', 'System.WorkflowVersion', 'system$workflowversion', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('ee842048-ff1d-4ea4-80b3-2d1123437d5f', '30834a21-e81c-4cbf-a10b-5f60f5fddc82', 'VersionHash', 'versionhash', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('2c5449d3-09f4-463f-8a99-439c6cb74fed', '30834a21-e81c-4cbf-a10b-5f60f5fddc82', 'ModelJSON', 'modeljson', 30, 0, '', false);
CREATE TABLE "system$workflowactivityusertaskoutcome" (
	"id" BIGINT NOT NULL,
	"outcome" VARCHAR_IGNORECASE(200) NULL,
	"time" TIMESTAMP NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('1ebda4ad-6e00-4b19-8b95-6b6261beb937', 'System.WorkflowActivityUserTaskOutcome', 'system$workflowactivityusertaskoutcome', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('f854eb95-236e-4c3f-af60-0d72c0cbf27b', '1ebda4ad-6e00-4b19-8b95-6b6261beb937', 'Outcome', 'outcome', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('9c9b1db9-e8ff-4192-b11d-4127162aa51a', '1ebda4ad-6e00-4b19-8b95-6b6261beb937', 'Time', 'time', 20, 0, '', false);
CREATE TABLE "system$workflowusertaskoutcome" (
	"id" BIGINT NOT NULL,
	"outcome" VARCHAR_IGNORECASE(200) NULL,
	"time" TIMESTAMP NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('d753ad05-63c3-4d18-9424-1dd97c7d1a05', 'System.WorkflowUserTaskOutcome', 'system$workflowusertaskoutcome', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('1c43b5b0-f645-4bc1-83fe-2da08ef1eba4', 'd753ad05-63c3-4d18-9424-1dd97c7d1a05', 'Outcome', 'outcome', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('2b63667d-dda0-4033-b432-679f51187ebb', 'd753ad05-63c3-4d18-9424-1dd97c7d1a05', 'Time', 'time', 20, 0, '', false);
CREATE TABLE "system$workflowdefinition" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(200) NULL,
	"title" VARCHAR_IGNORECASE(200) NULL,
	"isobsolete" BOOLEAN NULL,
	"islocked" BOOLEAN NULL,
	"modelguid" VARCHAR_IGNORECASE(36) NULL,
	PRIMARY KEY("id"),
	CONSTRAINT "uniq_system$workflowdefinition_modelguid" UNIQUE ("modelguid"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('5c570d3b-7b31-44fe-abd6-269a234584c5', 'System.WorkflowDefinition', 'system$workflowdefinition', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('d16c4272-c9d3-4371-86f6-69eb263033e1', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'Name', 'name', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('e023e8ca-3319-4698-a841-30430fdca099', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'Title', 'title', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('8554021f-9842-4c51-b124-86a102d33da7', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'IsObsolete', 'isobsolete', 10, 0, 'false', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('5544e32c-48e4-4580-bac2-ed8a14f1e098', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'IsLocked', 'islocked', 10, 0, 'false', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('d61ef304-2773-4336-a146-8997dfccae8a', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'ModelGUID', 'modelguid', 30, 36, '', false);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowdefinition_modelguid', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'd61ef304-2773-4336-a146-8997dfccae8a');
CREATE TABLE "system$workflowendedusertaskoutcome" (
	"id" BIGINT NOT NULL,
	"outcome" VARCHAR_IGNORECASE(200) NULL,
	"time" TIMESTAMP NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('03c36ed6-7828-420c-9a27-23839d06215d', 'System.WorkflowEndedUserTaskOutcome', 'system$workflowendedusertaskoutcome', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('4423bf8d-4eab-44bd-ac71-cabf7350ac5b', '03c36ed6-7828-420c-9a27-23839d06215d', 'Outcome', 'outcome', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('fe10bf82-e238-4b71-8b9f-27f96f04c8e6', '03c36ed6-7828-420c-9a27-23839d06215d', 'Time', 'time', 20, 0, '', false);
CREATE TABLE "system$workflowusertaskdefinition" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(200) NULL,
	"isobsolete" BOOLEAN NULL,
	"modelguid" VARCHAR_IGNORECASE(36) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('e09e866f-288b-475c-9465-792cde8b878c', 'System.WorkflowUserTaskDefinition', 'system$workflowusertaskdefinition', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('895f51f8-ff84-4694-aa65-1ba19eaeca5e', 'e09e866f-288b-475c-9465-792cde8b878c', 'Name', 'name', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('a6f93dd6-2725-4746-8283-c5c1e1f16d3f', 'e09e866f-288b-475c-9465-792cde8b878c', 'IsObsolete', 'isobsolete', 10, 0, 'false', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('015434e4-2727-4ee8-aef4-49d17b16afb1', 'e09e866f-288b-475c-9465-792cde8b878c', 'ModelGUID', 'modelguid', 30, 36, '', false);
CREATE TABLE "system$workflowendedusertask" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(2147483647) NULL,
	"description" VARCHAR_IGNORECASE(2147483647) NULL,
	"starttime" TIMESTAMP NULL,
	"duedate" TIMESTAMP NULL,
	"endtime" TIMESTAMP NULL,
	"outcome" VARCHAR_IGNORECASE(200) NULL,
	"state" VARCHAR_IGNORECASE(10) NULL,
	"completiontype" VARCHAR_IGNORECASE(9) NULL,
	"usertaskkey" VARCHAR_IGNORECASE(200) NULL,
	"error" VARCHAR_IGNORECASE(2147483647) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'System.WorkflowEndedUserTask', 'system$workflowendedusertask', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('328240c4-b920-4200-8e85-d6a420f1ceaa', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'Name', 'name', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('285fe8e2-5369-4e24-8d40-c70785d55ef1', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'Description', 'description', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('6710c9b3-0288-46dd-a624-cea974366ea2', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'StartTime', 'starttime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('088feb52-0ac7-4997-bf5b-7564aea4e44d', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'DueDate', 'duedate', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('90e6130c-018f-4f21-b749-6b4c3f40e705', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'EndTime', 'endtime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('08faf160-3940-4ee3-b95c-92cea1f231af', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'Outcome', 'outcome', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('480d214f-b588-4a45-99e6-7809c2da5762', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'State', 'state', 40, 10, 'Created', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('7a92c3a2-061c-4c59-baa3-0f5373880bb3', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'CompletionType', 'completiontype', 40, 9, 'Single', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('2cfe5222-30be-4047-ba8a-2fccc1ac495c', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'UserTaskKey', 'usertaskkey', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('a0b2a84e-a652-419b-a75e-9e1f7f47bf0d', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'Error', 'error', 30, 0, '', false);
CREATE TABLE "system$workflow" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(200) NULL,
	"description" VARCHAR_IGNORECASE(2147483647) NULL,
	"starttime" TIMESTAMP NULL,
	"endtime" TIMESTAMP NULL,
	"duedate" TIMESTAMP NULL,
	"canberestarted" BOOLEAN NULL,
	"canbecontinued" BOOLEAN NULL,
	"canapplyjumpto" BOOLEAN NULL,
	"state" VARCHAR_IGNORECASE(12) NULL,
	"reason" VARCHAR_IGNORECASE(2147483647) NULL,
	"previousstate" VARCHAR_IGNORECASE(12) NULL,
	"objectid" BIGINT NULL,
	"processingstate" VARCHAR_IGNORECASE(30) NULL,
	"system$owner" BIGINT NULL,
	PRIMARY KEY("id"));
CREATE INDEX "idx_system$workflow_system$owner" ON "system$workflow" ("system$owner" ASC,"id" ASC);
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('2ae37bf5-ecb8-4c55-b967-d7383925b208', 'System.Workflow', 'system$workflow', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('77cf3524-fcfe-40cf-8ac0-b073015550ef', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'Name', 'name', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('8a6b4eb4-9b10-4060-a823-79dd4c19c217', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'Description', 'description', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('c627be00-3ea1-4890-9621-d3dad9f11c21', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'StartTime', 'starttime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('59f6ed7a-8e1a-46c5-a288-c60cdd1baf50', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'EndTime', 'endtime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('80796d39-0dde-4af7-b619-53ec9950014b', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'DueDate', 'duedate', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('49d88092-1ce9-46e5-baad-b6c22831824d', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'CanBeRestarted', 'canberestarted', 10, 0, 'false', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('dec2408c-8fea-4232-8208-cad1117ca406', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'CanBeContinued', 'canbecontinued', 10, 0, 'false', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('986e45cf-3a56-4836-8ece-53df4d3dcf9e', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'CanApplyJumpTo', 'canapplyjumpto', 10, 0, 'true', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('ec48ea64-d4ae-42dd-8fbe-6c3716181dc7', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'State', 'state', 40, 12, 'InProgress', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('89e83bbd-6379-4601-89b4-825c02c7de6b', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'Reason', 'reason', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('4c70166c-8ebb-4105-a35a-d1e15a82d925', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'PreviousState', 'previousstate', 40, 12, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('e8722447-9692-4c59-8a28-153a4f6ebddb', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'ObjectId', 'objectid', 4, 0, '0', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('cbff7155-11df-47da-8619-b8bd72f40604', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'ProcessingState', 'processingstate', 30, 30, 'Ready', false);
INSERT INTO "mendixsystem$index" ("id", "table_id", "index_name") VALUES ('ac892dd9-fb9e-3590-aaf5-e3e2c7fbc021', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'idx_system$workflow_system$owner');
INSERT INTO "mendixsystem$index_column" ("index_id", "column_id", "sort_order", "ordinal") VALUES ('ac892dd9-fb9e-3590-aaf5-e3e2c7fbc021', '2cf6fdd7-e448-3a4d-b70e-6d875c2136d7', false, 0);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "storage_format") VALUES ('2cf6fdd7-e448-3a4d-b70e-6d875c2136d7', 'System.owner', 'system$workflow', '2ae37bf5-ecb8-4c55-b967-d7383925b208', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'id', 'system$owner', 1);
CREATE TABLE "system$workflowusertask" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(2147483647) NULL,
	"description" VARCHAR_IGNORECASE(2147483647) NULL,
	"starttime" TIMESTAMP NULL,
	"duedate" TIMESTAMP NULL,
	"endtime" TIMESTAMP NULL,
	"outcome" VARCHAR_IGNORECASE(200) NULL,
	"state" VARCHAR_IGNORECASE(10) NULL,
	"completiontype" VARCHAR_IGNORECASE(9) NULL,
	"processingstate" VARCHAR_IGNORECASE(30) NULL,
	"error" VARCHAR_IGNORECASE(2147483647) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('3729d27c-735b-457a-b210-9dffb125c3f3', 'System.WorkflowUserTask', 'system$workflowusertask', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('122c4e1e-edda-4311-85b7-2a715626b869', '3729d27c-735b-457a-b210-9dffb125c3f3', 'Name', 'name', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('544b4b9a-c5ac-4785-8efb-647a51648024', '3729d27c-735b-457a-b210-9dffb125c3f3', 'Description', 'description', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('beeda34a-8cd1-4bbe-abd3-b18a3a0ea0ef', '3729d27c-735b-457a-b210-9dffb125c3f3', 'StartTime', 'starttime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('17ae7bb0-2dea-4860-9c7b-f236aaf5a790', '3729d27c-735b-457a-b210-9dffb125c3f3', 'DueDate', 'duedate', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('49503f62-1887-4823-bf94-db88a332f316', '3729d27c-735b-457a-b210-9dffb125c3f3', 'EndTime', 'endtime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('047e7010-cbc4-4bba-bf64-774fa656d010', '3729d27c-735b-457a-b210-9dffb125c3f3', 'Outcome', 'outcome', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('f87a5a98-730e-4c57-b6c4-ae09cd057e65', '3729d27c-735b-457a-b210-9dffb125c3f3', 'State', 'state', 40, 10, 'Created', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('7d72fc37-c5cd-425d-82d2-0b8559b28314', '3729d27c-735b-457a-b210-9dffb125c3f3', 'CompletionType', 'completiontype', 40, 9, 'Single', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('99f67785-67f1-40e0-91dc-6cdec5e2b3e5', '3729d27c-735b-457a-b210-9dffb125c3f3', 'ProcessingState', 'processingstate', 30, 30, 'Ready', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('90233d09-6c96-487e-a89e-a31f29b81bd1', '3729d27c-735b-457a-b210-9dffb125c3f3', 'Error', 'error', 30, 0, '', false);
CREATE TABLE "system$workflowsubprocessdefinition" (
	"id" BIGINT NOT NULL,
	"caption" VARCHAR_IGNORECASE(200) NULL,
	"isobsolete" BOOLEAN NULL,
	"modelguid" VARCHAR_IGNORECASE(36) NULL,
	PRIMARY KEY("id"),
	CONSTRAINT "uniq_system$workflowsubprocessdefinition_modelguid" UNIQUE ("modelguid"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('abd99484-42cd-4ef8-93b3-bd161dc41422', 'System.WorkflowSubProcessDefinition', 'system$workflowsubprocessdefinition', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('e31fd3c5-c821-42e1-9828-046a876dba4d', 'abd99484-42cd-4ef8-93b3-bd161dc41422', 'Caption', 'caption', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('a25b29bb-f0cb-4992-861c-bea394f813c3', 'abd99484-42cd-4ef8-93b3-bd161dc41422', 'IsObsolete', 'isobsolete', 10, 0, 'false', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('4f585ace-ab6d-47a2-8558-bac6a65a377c', 'abd99484-42cd-4ef8-93b3-bd161dc41422', 'ModelGUID', 'modelguid', 30, 36, '', false);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowsubprocessdefinition_modelguid', 'abd99484-42cd-4ef8-93b3-bd161dc41422', '4f585ace-ab6d-47a2-8558-bac6a65a377c');
CREATE TABLE "system$taskqueuetoken" (
	"id" BIGINT NOT NULL,
	"queuename" VARCHAR_IGNORECASE(200) NULL,
	"xasid" VARCHAR_IGNORECASE(50) NULL,
	"validuntil" TIMESTAMP NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('bb60ef05-6d17-48ad-a4ef-559310c30c5b', 'System.TaskQueueToken', 'system$taskqueuetoken', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('f1c72f88-9feb-409f-b592-385be28eed47', 'bb60ef05-6d17-48ad-a4ef-559310c30c5b', 'QueueName', 'queuename', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('46add4ce-cd71-4db0-8fc7-0d1ab16954fa', 'bb60ef05-6d17-48ad-a4ef-559310c30c5b', 'XASId', 'xasid', 30, 50, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('c05017ba-1faa-4f63-9d4c-06918a947700', 'bb60ef05-6d17-48ad-a4ef-559310c30c5b', 'ValidUntil', 'validuntil', 20, 0, '', false);
CREATE TABLE "system$workflowsubprocess" (
	"id" BIGINT NOT NULL,
	"caption" VARCHAR_IGNORECASE(200) NULL,
	"starttime" TIMESTAMP NULL,
	"endtime" TIMESTAMP NULL,
	"state" VARCHAR_IGNORECASE(10) NULL,
	"reason" VARCHAR_IGNORECASE(2147483647) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('ed256e5b-42a9-406a-8d70-d4c24264de86', 'System.WorkflowSubProcess', 'system$workflowsubprocess', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('04911245-247d-4b25-b444-b0edf2039aee', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'Caption', 'caption', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('34a98df8-eb71-4d53-bd35-e35dd8ee8dfb', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'StartTime', 'starttime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('c2603799-0724-4718-af20-3ab1040d2cdf', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'EndTime', 'endtime', 20, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('5a97cb89-0e7a-4e4e-809f-023cf8e7685e', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'State', 'state', 40, 10, 'InProgress', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('cb58b3b5-9517-4cd4-8cc4-0f2f3ef7ae34', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'Reason', 'reason', 30, 0, '', false);
CREATE TABLE "system$workflowgroup" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(200) NULL,
	"description" VARCHAR_IGNORECASE(2147483647) NULL,
	"modelguid" VARCHAR_IGNORECASE(36) NULL,
	PRIMARY KEY("id"),
	CONSTRAINT "uniq_system$workflowgroup_name" UNIQUE ("name"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('7582d0f8-a963-4fde-8535-e1b257b388d6', 'System.WorkflowGroup', 'system$workflowgroup', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('28d9ed06-e6fd-4cba-b6a9-4f9e47fece63', '7582d0f8-a963-4fde-8535-e1b257b388d6', 'Name', 'name', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('41b5b84e-50fb-4851-a59a-272834dbf4c3', '7582d0f8-a963-4fde-8535-e1b257b388d6', 'Description', 'description', 30, 0, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('898f9984-f489-4e01-9fbe-4df29cba7ce5', '7582d0f8-a963-4fde-8535-e1b257b388d6', 'ModelGUID', 'modelguid', 30, 36, '', false);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowgroup_name', '7582d0f8-a963-4fde-8535-e1b257b388d6', '28d9ed06-e6fd-4cba-b6a9-4f9e47fece63');
DELETE FROM "mendixsystem$association"  WHERE "id" = '3ebbec61-8d41-400a-bb8c-901158f2440b';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowdefinition_currentworkflowversion_system$workflowdefinitionid' AND "column_id" = '385c3019-3deb-31af-a22a-ff964b0d33ef';
DELETE FROM "mendixsystem$association"  WHERE "id" = 'e5a8cc4f-8434-4454-8c8c-b06682938883';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowversion_workflowdefinition_system$workflowversionid' AND "column_id" = '63553733-e516-3ff2-9023-3fc64430802e';
DELETE FROM "mendixsystem$association"  WHERE "id" = '17aa315b-1576-4dd5-9b90-2c286717e27b';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowversion_previousversion_system$workflowversionid1' AND "column_id" = 'e6d0b87d-234f-3989-9d8d-783ab9b86811';
DELETE FROM "mendixsystem$association"  WHERE "id" = '3ffcbf28-6f71-4d2c-9e06-30590e5c1834';
DELETE FROM "mendixsystem$association"  WHERE "id" = '97a8df1e-d9ee-41ba-92f4-8b3dc262a32d';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowinstance_workflowcontext_system$workflowinstanceid' AND "column_id" = '7879565e-7529-38fe-8db4-ffdc2468fe59';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowinstance_workflowcontext_system$workflowcontextid' AND "column_id" = 'a6deb5d4-243e-31fe-8519-12f7291159a2';
DELETE FROM "mendixsystem$association"  WHERE "id" = 'e40c96ef-b6e4-47df-87c6-17d16102a4c7';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowinstance_workflowdefinition_system$workflowinstanceid' AND "column_id" = 'c16f925c-7828-3b50-95ec-ebddb60a31ec';
DELETE FROM "mendixsystem$association"  WHERE "id" = '2d11ff24-7c77-4f7e-a1e4-b307d6fd309b';
DELETE FROM "mendixsystem$association"  WHERE "id" = 'e76fecd3-ce21-48cc-b170-626bcdfb2e65';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$taskinstance_taskdefinition_system$workflowtaskinstanceid' AND "column_id" = 'fe65c820-b4b5-3841-876a-07bea1feab3f';
DELETE FROM "mendixsystem$association"  WHERE "id" = '3947e77c-80c2-11ea-bc55-0242ac130003';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$taskinstance_workflowinstance_system$workflowtaskinstanceid' AND "column_id" = '23783d5d-1141-32bc-97c7-414081c4c729';
DELETE FROM "mendixsystem$association"  WHERE "id" = 'a2383b0d-9ccd-44d6-9491-a01283393297';
DELETE FROM "mendixsystem$association"  WHERE "id" = 'f52506ee-39e6-454c-8a8f-0beab98223b7';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowusertask_assignee_system$workflowusertaskid' AND "column_id" = '1182844d-d422-3c3d-b80c-b5698cdc41e6';
DELETE FROM "mendixsystem$association"  WHERE "id" = 'd54e6b5d-03dd-4ead-9c40-55e25519fa60';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowactivity_taskinstance_system$workflowactivityid' AND "column_id" = '3996d740-8ad5-3d04-ab9b-a57fc9cfe723';
DELETE FROM "mendixsystem$association"  WHERE "id" = '5964a126-1afb-47ba-9cd2-2010342af482';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowactivity_workflowversion_system$workflowactivityid' AND "column_id" = '0ae270ec-5539-35e0-adfc-983de2afae66';
DELETE FROM "mendixsystem$association"  WHERE "id" = '6ba49c71-58f8-4365-b8ad-4ee9e91c9fb3';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$workflowactivity_workflowinstance_system$workflowactivityid' AND "column_id" = 'a56a1bfd-8cbc-3d73-a31e-60db73e990ee';
DELETE FROM "mendixsystem$association"  WHERE "id" = '6d9fa67c-cf0d-4b55-a923-eebe0b23b2b1';
DELETE FROM "mendixsystem$association"  WHERE "id" = 'f1e5de7f-b714-4d1d-ae7a-83e01a9b270e';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_system$taskdefinition_workflowdefinition_system$workflowtaskdefinitionid' AND "column_id" = '8d06b886-5975-3aa2-824f-dab4d0198fb9';
CREATE TABLE "system$workflowactivity_previousactivity" (
	"system$workflowactivityid1" BIGINT NOT NULL,
	"system$workflowactivityid2" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityid1","system$workflowactivityid2"));
CREATE INDEX "idx_system$workflowactivity_previousactivity_system$workflowactivity_system$workflowactivity" ON "system$workflowactivity_previousactivity" ("system$workflowactivityid2" ASC,"system$workflowactivityid1" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('8d8c8ffc-08d6-4dc5-88f6-5b344763d948', 'System.WorkflowActivity_PreviousActivity', 'system$workflowactivity_previousactivity', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'system$workflowactivityid1', 'system$workflowactivityid2', 'idx_system$workflowactivity_previousactivity_system$workflowactivity_system$workflowactivity', 2);
CREATE TABLE "system$workflowactivity_actor" (
	"system$workflowactivityid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityid","system$userid"),
	CONSTRAINT "uniq_system$workflowactivity_actor_system$workflowactivityid" UNIQUE ("system$workflowactivityid"));
CREATE INDEX "idx_system$workflowactivity_actor_system$user_system$workflowactivity" ON "system$workflowactivity_actor" ("system$userid" ASC,"system$workflowactivityid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('63446029-b863-4c07-ab91-22219be89b70', 'System.WorkflowActivity_Actor', 'system$workflowactivity_actor', 'a5952592-bb2c-4798-9805-f9ff91ad97de', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'system$workflowactivityid', 'system$userid', 'idx_system$workflowactivity_actor_system$user_system$workflowactivity', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowactivity_actor_system$workflowactivityid', '63446029-b863-4c07-ab91-22219be89b70', '38f7a539-d2df-398f-99b4-047c6f7ff859');
CREATE TABLE "system$workflowactivity_workflow" (
	"system$workflowactivityid" BIGINT NOT NULL,
	"system$workflowid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityid","system$workflowid"),
	CONSTRAINT "uniq_system$workflowactivity_workflow_system$workflowactivityid" UNIQUE ("system$workflowactivityid"));
CREATE INDEX "idx_system$workflowactivity_workflow_system$workflow_system$workflowactivity" ON "system$workflowactivity_workflow" ("system$workflowid" ASC,"system$workflowactivityid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('ef863cc9-2d20-4a74-af65-0320a76b6a10', 'System.WorkflowActivity_Workflow', 'system$workflowactivity_workflow', 'a5952592-bb2c-4798-9805-f9ff91ad97de', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'system$workflowactivityid', 'system$workflowid', 'idx_system$workflowactivity_workflow_system$workflow_system$workflowactivity', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowactivity_workflow_system$workflowactivityid', 'ef863cc9-2d20-4a74-af65-0320a76b6a10', '56628087-ac77-34ca-bd95-b86020fc4ffa');
CREATE TABLE "system$workflowactivity_workflowversion" (
	"system$workflowactivityid" BIGINT NOT NULL,
	"system$workflowversionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityid","system$workflowversionid"),
	CONSTRAINT "uniq_system$workflowactivity_workflowversion_system$workflowactivityid" UNIQUE ("system$workflowactivityid"));
CREATE INDEX "idx_system$workflowactivity_workflowversion_system$workflowversion_system$workflowactivity" ON "system$workflowactivity_workflowversion" ("system$workflowversionid" ASC,"system$workflowactivityid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('2e5166f9-7430-4265-8465-f7405d6fe1e9', 'System.WorkflowActivity_WorkflowVersion', 'system$workflowactivity_workflowversion', 'a5952592-bb2c-4798-9805-f9ff91ad97de', '30834a21-e81c-4cbf-a10b-5f60f5fddc82', 'system$workflowactivityid', 'system$workflowversionid', 'idx_system$workflowactivity_workflowversion_system$workflowversion_system$workflowactivity', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowactivity_workflowversion_system$workflowactivityid', '2e5166f9-7430-4265-8465-f7405d6fe1e9', 'f25c7cf4-22a7-30e7-a3b6-1cda08ccc618');
CREATE TABLE "system$workflowactivity_workflowsubprocess" (
	"system$workflowactivityid" BIGINT NOT NULL,
	"system$workflowsubprocessid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityid","system$workflowsubprocessid"),
	CONSTRAINT "uniq_system$workflowactivity_workflowsubprocess_system$workflowactivityid" UNIQUE ("system$workflowactivityid"));
CREATE INDEX "idx_system$workflowactivity_workflowsubprocess_system$workflowsubprocess_system$workflowactivity" ON "system$workflowactivity_workflowsubprocess" ("system$workflowsubprocessid" ASC,"system$workflowactivityid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('b8b548a4-5b04-4ea6-b59a-5f2c2802969c', 'System.WorkflowActivity_WorkflowSubProcess', 'system$workflowactivity_workflowsubprocess', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'system$workflowactivityid', 'system$workflowsubprocessid', 'idx_system$workflowactivity_workflowsubprocess_system$workflowsubprocess_system$workflowactivity', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowactivity_workflowsubprocess_system$workflowactivityid', 'b8b548a4-5b04-4ea6-b59a-5f2c2802969c', '77eed144-4320-34d1-881f-742f55b26079');
CREATE TABLE "system$workflowactivity_workflowusertask" (
	"system$workflowactivityid" BIGINT NOT NULL,
	"system$workflowusertaskid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityid","system$workflowusertaskid"),
	CONSTRAINT "uniq_system$workflowactivity_workflowusertask_system$workflowactivityid" UNIQUE ("system$workflowactivityid"));
CREATE INDEX "idx_system$workflowactivity_workflowusertask_system$workflowusertask_system$workflowactivity" ON "system$workflowactivity_workflowusertask" ("system$workflowusertaskid" ASC,"system$workflowactivityid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('aaebf783-447c-4386-ba25-969132aa6f7c', 'System.WorkflowActivity_WorkflowUserTask', 'system$workflowactivity_workflowusertask', 'a5952592-bb2c-4798-9805-f9ff91ad97de', '3729d27c-735b-457a-b210-9dffb125c3f3', 'system$workflowactivityid', 'system$workflowusertaskid', 'idx_system$workflowactivity_workflowusertask_system$workflowusertask_system$workflowactivity', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowactivity_workflowusertask_system$workflowactivityid', 'aaebf783-447c-4386-ba25-969132aa6f7c', '096b955d-f88f-303f-b43e-deef60b57065');
CREATE TABLE "system$workflowactivity_subworkflow" (
	"system$workflowactivityid" BIGINT NOT NULL,
	"system$workflowid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityid","system$workflowid"),
	CONSTRAINT "uniq_system$workflowactivity_subworkflow_system$workflowactivityid" UNIQUE ("system$workflowactivityid"));
CREATE INDEX "idx_system$workflowactivity_subworkflow_system$workflow_system$workflowactivity" ON "system$workflowactivity_subworkflow" ("system$workflowid" ASC,"system$workflowactivityid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('5c89ec5d-0378-4afd-afd4-0e7a9fde45a9', 'System.WorkflowActivity_SubWorkflow', 'system$workflowactivity_subworkflow', 'a5952592-bb2c-4798-9805-f9ff91ad97de', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'system$workflowactivityid', 'system$workflowid', 'idx_system$workflowactivity_subworkflow_system$workflow_system$workflowactivity', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowactivity_subworkflow_system$workflowactivityid', '5c89ec5d-0378-4afd-afd4-0e7a9fde45a9', '2d65cc25-b704-3604-8f2b-e3c73d37fb2b');
CREATE TABLE "system$changehash_session" (
	"system$changehashid" BIGINT NOT NULL,
	"system$sessionid" BIGINT NOT NULL,
	PRIMARY KEY("system$changehashid","system$sessionid"),
	CONSTRAINT "uniq_system$changehash_session_system$changehashid" UNIQUE ("system$changehashid"));
CREATE INDEX "idx_system$changehash_session_system$session_system$changehash" ON "system$changehash_session" ("system$sessionid" ASC,"system$changehashid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('1aa853ae-4871-4f54-9716-af1e36b6b031', 'System.ChangeHash_Session', 'system$changehash_session', '24f72d72-3c66-46e4-a08b-09daf0f451d8', '37f9fd49-5318-4c63-9a51-f761779b202f', 'system$changehashid', 'system$sessionid', 'idx_system$changehash_session_system$session_system$changehash', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$changehash_session_system$changehashid', '1aa853ae-4871-4f54-9716-af1e36b6b031', 'e4d85c0c-652d-3e54-859c-3b0f1db86277');
CREATE TABLE "system$workflowversion_workflowusertaskdefinition" (
	"system$workflowversionid" BIGINT NOT NULL,
	"system$workflowusertaskdefinitionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowversionid","system$workflowusertaskdefinitionid"));
CREATE INDEX "idx_system$workflowversion_workflowusertaskdefinition_system$workflowusertaskdefinition_system$workflowversion" ON "system$workflowversion_workflowusertaskdefinition" ("system$workflowusertaskdefinitionid" ASC,"system$workflowversionid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('3348e396-6643-4a5b-bcb1-a939cdcdf435', 'System.WorkflowVersion_WorkflowUserTaskDefinition', 'system$workflowversion_workflowusertaskdefinition', '30834a21-e81c-4cbf-a10b-5f60f5fddc82', 'e09e866f-288b-475c-9465-792cde8b878c', 'system$workflowversionid', 'system$workflowusertaskdefinitionid', 'idx_system$workflowversion_workflowusertaskdefinition_system$workflowusertaskdefinition_system$workflowversion', 2);
CREATE TABLE "system$workflowversion_previousversion" (
	"system$workflowversionid1" BIGINT NOT NULL,
	"system$workflowversionid2" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowversionid1","system$workflowversionid2"),
	CONSTRAINT "uniq_system$workflowversion_previousversion_system$workflowversionid1" UNIQUE ("system$workflowversionid1"));
CREATE INDEX "idx_system$workflowversion_previousversion_system$workflowversion_system$workflowversion" ON "system$workflowversion_previousversion" ("system$workflowversionid2" ASC,"system$workflowversionid1" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('61a2af90-0720-41a0-bea9-8a3d60de71d0', 'System.WorkflowVersion_PreviousVersion', 'system$workflowversion_previousversion', '30834a21-e81c-4cbf-a10b-5f60f5fddc82', '30834a21-e81c-4cbf-a10b-5f60f5fddc82', 'system$workflowversionid1', 'system$workflowversionid2', 'idx_system$workflowversion_previousversion_system$workflowversion_system$workflowversion', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowversion_previousversion_system$workflowversionid1', '61a2af90-0720-41a0-bea9-8a3d60de71d0', 'a0f7479f-37c0-39ac-9fb9-5589bd8627c5');
CREATE TABLE "system$workflowversion_workflowdefinition" (
	"system$workflowversionid" BIGINT NOT NULL,
	"system$workflowdefinitionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowversionid","system$workflowdefinitionid"),
	CONSTRAINT "uniq_system$workflowversion_workflowdefinition_system$workflowversionid" UNIQUE ("system$workflowversionid"));
CREATE INDEX "idx_system$workflowversion_workflowdefinition_system$workflowdefinition_system$workflowversion" ON "system$workflowversion_workflowdefinition" ("system$workflowdefinitionid" ASC,"system$workflowversionid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('c063e3e7-a440-47f0-8065-6fac7c723690', 'System.WorkflowVersion_WorkflowDefinition', 'system$workflowversion_workflowdefinition', '30834a21-e81c-4cbf-a10b-5f60f5fddc82', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'system$workflowversionid', 'system$workflowdefinitionid', 'idx_system$workflowversion_workflowdefinition_system$workflowdefinition_system$workflowversion', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowversion_workflowdefinition_system$workflowversionid', 'c063e3e7-a440-47f0-8065-6fac7c723690', '47c7ac0f-8b15-3178-ae6c-8b0cb0debb61');
CREATE TABLE "system$workflowactivityusertaskoutcome_workflowactivity" (
	"system$workflowactivityusertaskoutcomeid" BIGINT NOT NULL,
	"system$workflowactivityid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityusertaskoutcomeid","system$workflowactivityid"),
	CONSTRAINT "uniq_system$workflowactivityusertaskoutcome_workflowactivity_system$workflowactivityusertaskoutcomeid" UNIQUE ("system$workflowactivityusertaskoutcomeid"));
CREATE INDEX "idx_system$workflowactivityusertaskoutcome_workflowactivity_system$workflowactivity_system$workflowactivityusertaskoutcome" ON "system$workflowactivityusertaskoutcome_workflowactivity" ("system$workflowactivityid" ASC,"system$workflowactivityusertaskoutcomeid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('9ce50251-ec5a-46d0-ba7e-cb91876078f0', 'System.WorkflowActivityUserTaskOutcome_WorkflowActivity', 'system$workflowactivityusertaskoutcome_workflowactivity', '1ebda4ad-6e00-4b19-8b95-6b6261beb937', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'system$workflowactivityusertaskoutcomeid', 'system$workflowactivityid', 'idx_system$workflowactivityusertaskoutcome_workflowactivity_system$workflowactivity_system$workflowactivityusertaskoutcome', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowactivityusertaskoutcome_workflowactivity_system$workflowactivityusertaskoutcomeid', '9ce50251-ec5a-46d0-ba7e-cb91876078f0', 'ced1f439-bb5d-34eb-9344-68a02c7877e7');
CREATE TABLE "system$workflowactivityusertaskoutcome_user" (
	"system$workflowactivityusertaskoutcomeid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityusertaskoutcomeid","system$userid"),
	CONSTRAINT "uniq_system$workflowactivityusertaskoutcome_user_system$workflowactivityusertaskoutcomeid" UNIQUE ("system$workflowactivityusertaskoutcomeid"));
CREATE INDEX "idx_system$workflowactivityusertaskoutcome_user_system$user_system$workflowactivityusertaskoutcome" ON "system$workflowactivityusertaskoutcome_user" ("system$userid" ASC,"system$workflowactivityusertaskoutcomeid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('69f85619-f30b-427c-adb1-7be7ce8cc3dd', 'System.WorkflowActivityUserTaskOutcome_User', 'system$workflowactivityusertaskoutcome_user', '1ebda4ad-6e00-4b19-8b95-6b6261beb937', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'system$workflowactivityusertaskoutcomeid', 'system$userid', 'idx_system$workflowactivityusertaskoutcome_user_system$user_system$workflowactivityusertaskoutcome', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowactivityusertaskoutcome_user_system$workflowactivityusertaskoutcomeid', '69f85619-f30b-427c-adb1-7be7ce8cc3dd', '0e354480-b4c1-3655-9f12-e34dc1488c2f');
CREATE TABLE "system$workflowusertaskoutcome_user" (
	"system$workflowusertaskoutcomeid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskoutcomeid","system$userid"),
	CONSTRAINT "uniq_system$workflowusertaskoutcome_user_system$workflowusertaskoutcomeid" UNIQUE ("system$workflowusertaskoutcomeid"));
CREATE INDEX "idx_system$workflowusertaskoutcome_user_system$user_system$workflowusertaskoutcome" ON "system$workflowusertaskoutcome_user" ("system$userid" ASC,"system$workflowusertaskoutcomeid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('d49ae7eb-5886-4a82-8659-be0b01d13104', 'System.WorkflowUserTaskOutcome_User', 'system$workflowusertaskoutcome_user', 'd753ad05-63c3-4d18-9424-1dd97c7d1a05', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'system$workflowusertaskoutcomeid', 'system$userid', 'idx_system$workflowusertaskoutcome_user_system$user_system$workflowusertaskoutcome', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowusertaskoutcome_user_system$workflowusertaskoutcomeid', 'd49ae7eb-5886-4a82-8659-be0b01d13104', '1416fe96-0847-37c7-8af0-e159dca1b3c7');
CREATE TABLE "system$workflowusertaskoutcome_workflowusertask" (
	"system$workflowusertaskoutcomeid" BIGINT NOT NULL,
	"system$workflowusertaskid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskoutcomeid","system$workflowusertaskid"),
	CONSTRAINT "uniq_system$workflowusertaskoutcome_workflowusertask_system$workflowusertaskoutcomeid" UNIQUE ("system$workflowusertaskoutcomeid"));
CREATE INDEX "idx_system$workflowusertaskoutcome_workflowusertask_system$workflowusertask_system$workflowusertaskoutcome" ON "system$workflowusertaskoutcome_workflowusertask" ("system$workflowusertaskid" ASC,"system$workflowusertaskoutcomeid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('37818a79-121d-447e-aa9d-89e88b145180', 'System.WorkflowUserTaskOutcome_WorkflowUserTask', 'system$workflowusertaskoutcome_workflowusertask', 'd753ad05-63c3-4d18-9424-1dd97c7d1a05', '3729d27c-735b-457a-b210-9dffb125c3f3', 'system$workflowusertaskoutcomeid', 'system$workflowusertaskid', 'idx_system$workflowusertaskoutcome_workflowusertask_system$workflowusertask_system$workflowusertaskoutcome', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowusertaskoutcome_workflowusertask_system$workflowusertaskoutcomeid', '37818a79-121d-447e-aa9d-89e88b145180', '350d214b-6b9c-3c5d-a6d2-3483fecc59d8');
CREATE TABLE "system$workflowdefinition_currentworkflowversion" (
	"system$workflowdefinitionid" BIGINT NOT NULL,
	"system$workflowversionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowdefinitionid","system$workflowversionid"),
	CONSTRAINT "uniq_system$workflowdefinition_currentworkflowversion_system$workflowdefinitionid" UNIQUE ("system$workflowdefinitionid"));
CREATE INDEX "idx_system$workflowdefinition_currentworkflowversion_system$workflowversion_system$workflowdefinition" ON "system$workflowdefinition_currentworkflowversion" ("system$workflowversionid" ASC,"system$workflowdefinitionid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('2b065cdd-3d2c-4517-9727-ced57d97fd03', 'System.WorkflowDefinition_CurrentWorkflowVersion', 'system$workflowdefinition_currentworkflowversion', '5c570d3b-7b31-44fe-abd6-269a234584c5', '30834a21-e81c-4cbf-a10b-5f60f5fddc82', 'system$workflowdefinitionid', 'system$workflowversionid', 'idx_system$workflowdefinition_currentworkflowversion_system$workflowversion_system$workflowdefinition', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowdefinition_currentworkflowversion_system$workflowdefinitionid', '2b065cdd-3d2c-4517-9727-ced57d97fd03', 'eb384fa0-c9cd-3568-bdd6-1501cb6e352e');
CREATE TABLE "system$workflowendedusertaskoutcome_workflowendedusertask" (
	"system$workflowendedusertaskoutcomeid" BIGINT NOT NULL,
	"system$workflowendedusertaskid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowendedusertaskoutcomeid","system$workflowendedusertaskid"),
	CONSTRAINT "uniq_system$workflowendedusertaskoutcome_workflowendedusertask_system$workflowendedusertaskoutcomeid" UNIQUE ("system$workflowendedusertaskoutcomeid"));
CREATE INDEX "idx_system$workflowendedusertaskoutcome_workflowendedusertask_system$workflowendedusertask_system$workflowendedusertaskoutcome" ON "system$workflowendedusertaskoutcome_workflowendedusertask" ("system$workflowendedusertaskid" ASC,"system$workflowendedusertaskoutcomeid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('91790cd2-b8d9-4e3a-82be-504f4552d1d6', 'System.WorkflowEndedUserTaskOutcome_WorkflowEndedUserTask', 'system$workflowendedusertaskoutcome_workflowendedusertask', '03c36ed6-7828-420c-9a27-23839d06215d', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'system$workflowendedusertaskoutcomeid', 'system$workflowendedusertaskid', 'idx_system$workflowendedusertaskoutcome_workflowendedusertask_system$workflowendedusertask_system$workflowendedusertaskoutcome', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowendedusertaskoutcome_workflowendedusertask_system$workflowendedusertaskoutcomeid', '91790cd2-b8d9-4e3a-82be-504f4552d1d6', '1b4998f8-5aed-36c2-94c7-81f202cc6225');
CREATE TABLE "system$workflowendedusertaskoutcome_user" (
	"system$workflowendedusertaskoutcomeid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowendedusertaskoutcomeid","system$userid"),
	CONSTRAINT "uniq_system$workflowendedusertaskoutcome_user_system$workflowendedusertaskoutcomeid" UNIQUE ("system$workflowendedusertaskoutcomeid"));
CREATE INDEX "idx_system$workflowendedusertaskoutcome_user_system$user_system$workflowendedusertaskoutcome" ON "system$workflowendedusertaskoutcome_user" ("system$userid" ASC,"system$workflowendedusertaskoutcomeid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('116d625c-39af-4c3b-b723-7b990b8d4336', 'System.WorkflowEndedUserTaskOutcome_User', 'system$workflowendedusertaskoutcome_user', '03c36ed6-7828-420c-9a27-23839d06215d', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'system$workflowendedusertaskoutcomeid', 'system$userid', 'idx_system$workflowendedusertaskoutcome_user_system$user_system$workflowendedusertaskoutcome', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowendedusertaskoutcome_user_system$workflowendedusertaskoutcomeid', '116d625c-39af-4c3b-b723-7b990b8d4336', '1954a632-5f15-3c9f-a755-f78a51ec01ac');
CREATE TABLE "system$workflowusertaskdefinition_workflowdefinition" (
	"system$workflowusertaskdefinitionid" BIGINT NOT NULL,
	"system$workflowdefinitionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskdefinitionid","system$workflowdefinitionid"),
	CONSTRAINT "uniq_system$workflowusertaskdefinition_workflowdefinition_system$workflowusertaskdefinitionid" UNIQUE ("system$workflowusertaskdefinitionid"));
CREATE INDEX "idx_system$workflowusertaskdefinition_workflowdefinition_system$workflowdefinition_system$workflowusertaskdefinition" ON "system$workflowusertaskdefinition_workflowdefinition" ("system$workflowdefinitionid" ASC,"system$workflowusertaskdefinitionid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('685c576c-19af-4ea7-983d-ece147c1cebc', 'System.WorkflowUserTaskDefinition_WorkflowDefinition', 'system$workflowusertaskdefinition_workflowdefinition', 'e09e866f-288b-475c-9465-792cde8b878c', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'system$workflowusertaskdefinitionid', 'system$workflowdefinitionid', 'idx_system$workflowusertaskdefinition_workflowdefinition_system$workflowdefinition_system$workflowusertaskdefinition', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowusertaskdefinition_workflowdefinition_system$workflowusertaskdefinitionid', '685c576c-19af-4ea7-983d-ece147c1cebc', 'ce3750f0-8db1-37ca-95b5-892696a3d9e2');
CREATE TABLE "system$workflowusertaskdefinition_workflowsubprocessdefinition" (
	"system$workflowusertaskdefinitionid" BIGINT NOT NULL,
	"system$workflowsubprocessdefinitionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskdefinitionid","system$workflowsubprocessdefinitionid"),
	CONSTRAINT "uniq_system$workflowusertaskdefinition_workflowsubprocessdefinition_system$workflowusertaskdefinitionid" UNIQUE ("system$workflowusertaskdefinitionid"));
CREATE INDEX "idx_system$workflowusertaskdefinition_workflowsubprocessdefinition" ON "system$workflowusertaskdefinition_workflowsubprocessdefinition" ("system$workflowsubprocessdefinitionid" ASC,"system$workflowusertaskdefinitionid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('823221cc-66e3-4176-80fa-7f6cc81900f9', 'System.WorkflowUserTaskDefinition_WorkflowSubProcessDefinition', 'system$workflowusertaskdefinition_workflowsubprocessdefinition', 'e09e866f-288b-475c-9465-792cde8b878c', 'abd99484-42cd-4ef8-93b3-bd161dc41422', 'system$workflowusertaskdefinitionid', 'system$workflowsubprocessdefinitionid', 'idx_system$workflowusertaskdefinition_workflowsubprocessdefinition', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowusertaskdefinition_workflowsubprocessdefinition_system$workflowusertaskdefinitionid', '823221cc-66e3-4176-80fa-7f6cc81900f9', '044dbbd9-b0a9-3bfb-81d0-25ac58525108');
CREATE TABLE "system$workflowendedusertask_targetgroups" (
	"system$workflowendedusertaskid" BIGINT NOT NULL,
	"system$workflowgroupid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowendedusertaskid","system$workflowgroupid"));
CREATE INDEX "idx_system$workflowendedusertask_targetgroups_system$workflowgroup_system$workflowendedusertask" ON "system$workflowendedusertask_targetgroups" ("system$workflowgroupid" ASC,"system$workflowendedusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('c19b560c-e552-40aa-b57e-c24596c097fc', 'System.WorkflowEndedUserTask_TargetGroups', 'system$workflowendedusertask_targetgroups', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', '7582d0f8-a963-4fde-8535-e1b257b388d6', 'system$workflowendedusertaskid', 'system$workflowgroupid', 'idx_system$workflowendedusertask_targetgroups_system$workflowgroup_system$workflowendedusertask', 2);
CREATE TABLE "system$workflowendedusertask_targetusers" (
	"system$workflowendedusertaskid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowendedusertaskid","system$userid"));
CREATE INDEX "idx_system$workflowendedusertask_targetusers_system$user_system$workflowendedusertask" ON "system$workflowendedusertask_targetusers" ("system$userid" ASC,"system$workflowendedusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('42883174-f6d5-47e3-9094-ee0b197328ab', 'System.WorkflowEndedUserTask_TargetUsers', 'system$workflowendedusertask_targetusers', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'system$workflowendedusertaskid', 'system$userid', 'idx_system$workflowendedusertask_targetusers_system$user_system$workflowendedusertask', 2);
CREATE TABLE "system$workflowendedusertask_workflowusertaskdefinition" (
	"system$workflowendedusertaskid" BIGINT NOT NULL,
	"system$workflowusertaskdefinitionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowendedusertaskid","system$workflowusertaskdefinitionid"),
	CONSTRAINT "uniq_system$workflowendedusertask_workflowusertaskdefinition_system$workflowendedusertaskid" UNIQUE ("system$workflowendedusertaskid"));
CREATE INDEX "idx_system$workflowendedusertask_workflowusertaskdefinition_system$workflowusertaskdefinition_system$workflowendedusertask" ON "system$workflowendedusertask_workflowusertaskdefinition" ("system$workflowusertaskdefinitionid" ASC,"system$workflowendedusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('ea83a1f9-f686-4c16-8146-ff386d4f62a8', 'System.WorkflowEndedUserTask_WorkflowUserTaskDefinition', 'system$workflowendedusertask_workflowusertaskdefinition', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'e09e866f-288b-475c-9465-792cde8b878c', 'system$workflowendedusertaskid', 'system$workflowusertaskdefinitionid', 'idx_system$workflowendedusertask_workflowusertaskdefinition_system$workflowusertaskdefinition_system$workflowendedusertask', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowendedusertask_workflowusertaskdefinition_system$workflowendedusertaskid', 'ea83a1f9-f686-4c16-8146-ff386d4f62a8', '7ba49166-d9e2-3612-b7d4-3e0004d203dd');
CREATE TABLE "system$workflowendedusertask_workflow" (
	"system$workflowendedusertaskid" BIGINT NOT NULL,
	"system$workflowid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowendedusertaskid","system$workflowid"),
	CONSTRAINT "uniq_system$workflowendedusertask_workflow_system$workflowendedusertaskid" UNIQUE ("system$workflowendedusertaskid"));
CREATE INDEX "idx_system$workflowendedusertask_workflow_system$workflow_system$workflowendedusertask" ON "system$workflowendedusertask_workflow" ("system$workflowid" ASC,"system$workflowendedusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('e1fad91f-3bf8-4a02-88f9-4a2316c7d840', 'System.WorkflowEndedUserTask_Workflow', 'system$workflowendedusertask_workflow', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'system$workflowendedusertaskid', 'system$workflowid', 'idx_system$workflowendedusertask_workflow_system$workflow_system$workflowendedusertask', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowendedusertask_workflow_system$workflowendedusertaskid', 'e1fad91f-3bf8-4a02-88f9-4a2316c7d840', '19cf3bd4-c27c-319c-9329-9095669c4b4f');
CREATE TABLE "system$workflowendedusertask_workflowsubprocess" (
	"system$workflowendedusertaskid" BIGINT NOT NULL,
	"system$workflowsubprocessid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowendedusertaskid","system$workflowsubprocessid"),
	CONSTRAINT "uniq_system$workflowendedusertask_workflowsubprocess_system$workflowendedusertaskid" UNIQUE ("system$workflowendedusertaskid"));
CREATE INDEX "idx_system$workflowendedusertask_workflowsubprocess_system$workflowsubprocess_system$workflowendedusertask" ON "system$workflowendedusertask_workflowsubprocess" ("system$workflowsubprocessid" ASC,"system$workflowendedusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('6e232f14-1040-4bfe-b8c2-0e3e91d787c1', 'System.WorkflowEndedUserTask_WorkflowSubProcess', 'system$workflowendedusertask_workflowsubprocess', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'system$workflowendedusertaskid', 'system$workflowsubprocessid', 'idx_system$workflowendedusertask_workflowsubprocess_system$workflowsubprocess_system$workflowendedusertask', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowendedusertask_workflowsubprocess_system$workflowendedusertaskid', '6e232f14-1040-4bfe-b8c2-0e3e91d787c1', '51763ae8-2afe-3d35-a226-dd384c9e64f8');
CREATE TABLE "system$workflowendedusertask_assignees" (
	"system$workflowendedusertaskid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowendedusertaskid","system$userid"));
CREATE INDEX "idx_system$workflowendedusertask_assignees_system$user_system$workflowendedusertask" ON "system$workflowendedusertask_assignees" ("system$userid" ASC,"system$workflowendedusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('a7f1e558-d129-4adb-b5b4-dbb4853056f2', 'System.WorkflowEndedUserTask_Assignees', 'system$workflowendedusertask_assignees', '2e12231f-c3b1-4b7c-bc42-d82c778a62a4', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'system$workflowendedusertaskid', 'system$userid', 'idx_system$workflowendedusertask_assignees_system$user_system$workflowendedusertask', 2);
CREATE TABLE "system$workflow_parentworkflow" (
	"system$workflowid1" BIGINT NOT NULL,
	"system$workflowid2" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowid1","system$workflowid2"),
	CONSTRAINT "uniq_system$workflow_parentworkflow_system$workflowid1" UNIQUE ("system$workflowid1"));
CREATE INDEX "idx_system$workflow_parentworkflow_system$workflow_system$workflow" ON "system$workflow_parentworkflow" ("system$workflowid2" ASC,"system$workflowid1" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('79314052-9dcc-47e5-954b-80ec631ddd41', 'System.Workflow_ParentWorkflow', 'system$workflow_parentworkflow', '2ae37bf5-ecb8-4c55-b967-d7383925b208', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'system$workflowid1', 'system$workflowid2', 'idx_system$workflow_parentworkflow_system$workflow_system$workflow', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflow_parentworkflow_system$workflowid1', '79314052-9dcc-47e5-954b-80ec631ddd41', '84b93b3b-9d0a-342e-b78b-17657b92fc22');
CREATE TABLE "system$workflow_workflowdefinition" (
	"system$workflowid" BIGINT NOT NULL,
	"system$workflowdefinitionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowid","system$workflowdefinitionid"),
	CONSTRAINT "uniq_system$workflow_workflowdefinition_system$workflowid" UNIQUE ("system$workflowid"));
CREATE INDEX "idx_system$workflow_workflowdefinition_system$workflowdefinition_system$workflow" ON "system$workflow_workflowdefinition" ("system$workflowdefinitionid" ASC,"system$workflowid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('77c87c19-f28d-4ca3-870c-351722cf5e9e', 'System.Workflow_WorkflowDefinition', 'system$workflow_workflowdefinition', '2ae37bf5-ecb8-4c55-b967-d7383925b208', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'system$workflowid', 'system$workflowdefinitionid', 'idx_system$workflow_workflowdefinition_system$workflowdefinition_system$workflow', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflow_workflowdefinition_system$workflowid', '77c87c19-f28d-4ca3-870c-351722cf5e9e', '593e832a-6cbc-3208-b1a1-06b8b873428f');
CREATE TABLE "system$workflow_currentactivity" (
	"system$workflowid" BIGINT NOT NULL,
	"system$workflowactivityid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowid","system$workflowactivityid"));
CREATE INDEX "idx_system$workflow_currentactivity_system$workflowactivity_system$workflow" ON "system$workflow_currentactivity" ("system$workflowactivityid" ASC,"system$workflowid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('58aa640e-8db7-479b-9f91-2425b009ee06', 'System.Workflow_CurrentActivity', 'system$workflow_currentactivity', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'system$workflowid', 'system$workflowactivityid', 'idx_system$workflow_currentactivity_system$workflowactivity_system$workflow', 2);
CREATE TABLE "system$workflowusertask_workflowusertaskdefinition" (
	"system$workflowusertaskid" BIGINT NOT NULL,
	"system$workflowusertaskdefinitionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskid","system$workflowusertaskdefinitionid"),
	CONSTRAINT "uniq_system$workflowusertask_workflowusertaskdefinition_system$workflowusertaskid" UNIQUE ("system$workflowusertaskid"));
CREATE INDEX "idx_system$workflowusertask_workflowusertaskdefinition_system$workflowusertaskdefinition_system$workflowusertask" ON "system$workflowusertask_workflowusertaskdefinition" ("system$workflowusertaskdefinitionid" ASC,"system$workflowusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('0169cc0e-491b-4ee3-812d-6bf3ba28e287', 'System.WorkflowUserTask_WorkflowUserTaskDefinition', 'system$workflowusertask_workflowusertaskdefinition', '3729d27c-735b-457a-b210-9dffb125c3f3', 'e09e866f-288b-475c-9465-792cde8b878c', 'system$workflowusertaskid', 'system$workflowusertaskdefinitionid', 'idx_system$workflowusertask_workflowusertaskdefinition_system$workflowusertaskdefinition_system$workflowusertask', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowusertask_workflowusertaskdefinition_system$workflowusertaskid', '0169cc0e-491b-4ee3-812d-6bf3ba28e287', '0643c851-59f7-3428-92a1-a970ad21ad18');
CREATE TABLE "system$workflowusertask_assignees" (
	"system$workflowusertaskid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskid","system$userid"));
CREATE INDEX "idx_system$workflowusertask_assignees_system$user_system$workflowusertask" ON "system$workflowusertask_assignees" ("system$userid" ASC,"system$workflowusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('929fbbed-d3a8-4ea2-b6ad-b28de4f77776', 'System.WorkflowUserTask_Assignees', 'system$workflowusertask_assignees', '3729d27c-735b-457a-b210-9dffb125c3f3', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'system$workflowusertaskid', 'system$userid', 'idx_system$workflowusertask_assignees_system$user_system$workflowusertask', 2);
CREATE TABLE "system$workflowusertask_workflowsubprocess" (
	"system$workflowusertaskid" BIGINT NOT NULL,
	"system$workflowsubprocessid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskid","system$workflowsubprocessid"),
	CONSTRAINT "uniq_system$workflowusertask_workflowsubprocess_system$workflowusertaskid" UNIQUE ("system$workflowusertaskid"));
CREATE INDEX "idx_system$workflowusertask_workflowsubprocess_system$workflowsubprocess_system$workflowusertask" ON "system$workflowusertask_workflowsubprocess" ("system$workflowsubprocessid" ASC,"system$workflowusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('639df7bf-fe8e-4f68-bb17-55978a15a07b', 'System.WorkflowUserTask_WorkflowSubProcess', 'system$workflowusertask_workflowsubprocess', '3729d27c-735b-457a-b210-9dffb125c3f3', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'system$workflowusertaskid', 'system$workflowsubprocessid', 'idx_system$workflowusertask_workflowsubprocess_system$workflowsubprocess_system$workflowusertask', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowusertask_workflowsubprocess_system$workflowusertaskid', '639df7bf-fe8e-4f68-bb17-55978a15a07b', '68a9fe3f-7ce0-31b4-8427-f4e60caab809');
CREATE TABLE "system$workflowusertask_workflow" (
	"system$workflowusertaskid" BIGINT NOT NULL,
	"system$workflowid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskid","system$workflowid"),
	CONSTRAINT "uniq_system$workflowusertask_workflow_system$workflowusertaskid" UNIQUE ("system$workflowusertaskid"));
CREATE INDEX "idx_system$workflowusertask_workflow_system$workflow_system$workflowusertask" ON "system$workflowusertask_workflow" ("system$workflowid" ASC,"system$workflowusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('53a1c6d7-5e4d-4a2d-81ec-58fde4bbba8a', 'System.WorkflowUserTask_Workflow', 'system$workflowusertask_workflow', '3729d27c-735b-457a-b210-9dffb125c3f3', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'system$workflowusertaskid', 'system$workflowid', 'idx_system$workflowusertask_workflow_system$workflow_system$workflowusertask', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowusertask_workflow_system$workflowusertaskid', '53a1c6d7-5e4d-4a2d-81ec-58fde4bbba8a', 'bb1eaa2c-e600-3a88-85d0-08d5f5ca94da');
CREATE TABLE "system$workflowusertask_targetgroups" (
	"system$workflowusertaskid" BIGINT NOT NULL,
	"system$workflowgroupid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskid","system$workflowgroupid"));
CREATE INDEX "idx_system$workflowusertask_targetgroups_system$workflowgroup_system$workflowusertask" ON "system$workflowusertask_targetgroups" ("system$workflowgroupid" ASC,"system$workflowusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('3b215944-42bb-4113-bfb4-58b1f7b34460', 'System.WorkflowUserTask_TargetGroups', 'system$workflowusertask_targetgroups', '3729d27c-735b-457a-b210-9dffb125c3f3', '7582d0f8-a963-4fde-8535-e1b257b388d6', 'system$workflowusertaskid', 'system$workflowgroupid', 'idx_system$workflowusertask_targetgroups_system$workflowgroup_system$workflowusertask', 2);
CREATE TABLE "system$workflowusertask_targetusers" (
	"system$workflowusertaskid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskid","system$userid"));
CREATE INDEX "idx_system$workflowusertask_targetusers_system$user_system$workflowusertask" ON "system$workflowusertask_targetusers" ("system$userid" ASC,"system$workflowusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('2b9c1990-302f-474c-9341-9d5d23b27653', 'System.WorkflowUserTask_TargetUsers', 'system$workflowusertask_targetusers', '3729d27c-735b-457a-b210-9dffb125c3f3', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'system$workflowusertaskid', 'system$userid', 'idx_system$workflowusertask_targetusers_system$user_system$workflowusertask', 2);
CREATE TABLE "system$workflowsubprocessdefinition_workflowdefinition" (
	"system$workflowsubprocessdefinitionid" BIGINT NOT NULL,
	"system$workflowdefinitionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowsubprocessdefinitionid","system$workflowdefinitionid"),
	CONSTRAINT "uniq_system$workflowsubprocessdefinition_workflowdefinition_system$workflowsubprocessdefinitionid" UNIQUE ("system$workflowsubprocessdefinitionid"));
CREATE INDEX "idx_system$workflowsubprocessdefinition_workflowdefinition_system$workflowdefinition_system$workflowsubprocessdefinition" ON "system$workflowsubprocessdefinition_workflowdefinition" ("system$workflowdefinitionid" ASC,"system$workflowsubprocessdefinitionid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('cec39239-05f1-49d3-9274-d7b1e99852ac', 'System.WorkflowSubProcessDefinition_WorkflowDefinition', 'system$workflowsubprocessdefinition_workflowdefinition', 'abd99484-42cd-4ef8-93b3-bd161dc41422', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'system$workflowsubprocessdefinitionid', 'system$workflowdefinitionid', 'idx_system$workflowsubprocessdefinition_workflowdefinition_system$workflowdefinition_system$workflowsubprocessdefinition', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowsubprocessdefinition_workflowdefinition_system$workflowsubprocessdefinitionid', 'cec39239-05f1-49d3-9274-d7b1e99852ac', '7a8d8612-72b1-3447-b842-31885e3e1f40');
CREATE TABLE "system$workflowsubprocess_workflowsubprocessdefinition" (
	"system$workflowsubprocessid" BIGINT NOT NULL,
	"system$workflowsubprocessdefinitionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowsubprocessid","system$workflowsubprocessdefinitionid"),
	CONSTRAINT "uniq_system$workflowsubprocess_workflowsubprocessdefinition_system$workflowsubprocessid" UNIQUE ("system$workflowsubprocessid"));
CREATE INDEX "idx_system$workflowsubprocess_workflowsubprocessdefinition_system$workflowsubprocessdefinition_system$workflowsubprocess" ON "system$workflowsubprocess_workflowsubprocessdefinition" ("system$workflowsubprocessdefinitionid" ASC,"system$workflowsubprocessid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('616dd9e7-e886-4439-9ecb-72e39e0b27ea', 'System.WorkflowSubProcess_WorkflowSubProcessDefinition', 'system$workflowsubprocess_workflowsubprocessdefinition', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'abd99484-42cd-4ef8-93b3-bd161dc41422', 'system$workflowsubprocessid', 'system$workflowsubprocessdefinitionid', 'idx_system$workflowsubprocess_workflowsubprocessdefinition_system$workflowsubprocessdefinition_system$workflowsubprocess', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowsubprocess_workflowsubprocessdefinition_system$workflowsubprocessid', '616dd9e7-e886-4439-9ecb-72e39e0b27ea', '916b80f9-fdbf-3e9e-b3a8-183ef4902924');
CREATE TABLE "system$workflowsubprocess_workflow" (
	"system$workflowsubprocessid" BIGINT NOT NULL,
	"system$workflowid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowsubprocessid","system$workflowid"),
	CONSTRAINT "uniq_system$workflowsubprocess_workflow_system$workflowsubprocessid" UNIQUE ("system$workflowsubprocessid"));
CREATE INDEX "idx_system$workflowsubprocess_workflow_system$workflow_system$workflowsubprocess" ON "system$workflowsubprocess_workflow" ("system$workflowid" ASC,"system$workflowsubprocessid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('cb22ec93-b0fc-4d48-9dc1-5a84a1a82943', 'System.WorkflowSubProcess_Workflow', 'system$workflowsubprocess_workflow', 'ed256e5b-42a9-406a-8d70-d4c24264de86', '2ae37bf5-ecb8-4c55-b967-d7383925b208', 'system$workflowsubprocessid', 'system$workflowid', 'idx_system$workflowsubprocess_workflow_system$workflow_system$workflowsubprocess', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowsubprocess_workflow_system$workflowsubprocessid', 'cb22ec93-b0fc-4d48-9dc1-5a84a1a82943', '219320f5-a998-3606-bac5-2d1d908f0eee');
CREATE TABLE "system$workflowgroup_user" (
	"system$workflowgroupid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowgroupid","system$userid"));
CREATE INDEX "idx_system$workflowgroup_user_system$user_system$workflowgroup" ON "system$workflowgroup_user" ("system$userid" ASC,"system$workflowgroupid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('c407f399-7e6c-4c2d-9b8d-1d24855f031b', 'System.WorkflowGroup_User', 'system$workflowgroup_user', '7582d0f8-a963-4fde-8535-e1b257b388d6', '282e2e60-88a5-469d-84a5-ba8d9151644f', 'system$workflowgroupid', 'system$userid', 'idx_system$workflowgroup_user_system$user_system$workflowgroup', 2);
DELETE FROM "c962d0d3987f4737a8e76f4f7ac3d7b3"  WHERE "system$workflowtaskinstanceid" IN ( SELECT "id" FROM "f600f850bcd1499290dc6dd9a89cded2" );
DELETE FROM "5e3bb0558d23443bae1f89f134094d92"  WHERE "system$workflowtaskinstanceid" IN ( SELECT "id" FROM "f600f850bcd1499290dc6dd9a89cded2" );
DELETE FROM "bccd09a1d4e444398505954d3eb2397b"  WHERE "system$workflowtaskinstanceid" IN ( SELECT "id" FROM "f600f850bcd1499290dc6dd9a89cded2" );
DELETE FROM "f615992650dc444d9c0678ab2aa6fff5"  WHERE "id" IN ( SELECT "id" FROM "f600f850bcd1499290dc6dd9a89cded2" );
DELETE FROM "c962d0d3987f4737a8e76f4f7ac3d7b3"  WHERE "system$workflowtaskinstanceid" IN ( SELECT "id" FROM "b5c5b267a13a417abe1e01d82e564c63" );
DELETE FROM "5e3bb0558d23443bae1f89f134094d92"  WHERE "system$workflowtaskinstanceid" IN ( SELECT "id" FROM "b5c5b267a13a417abe1e01d82e564c63" );
DELETE FROM "bccd09a1d4e444398505954d3eb2397b"  WHERE "system$workflowtaskinstanceid" IN ( SELECT "id" FROM "b5c5b267a13a417abe1e01d82e564c63" );
DELETE FROM "f615992650dc444d9c0678ab2aa6fff5"  WHERE "id" IN ( SELECT "id" FROM "b5c5b267a13a417abe1e01d82e564c63" );
DROP TABLE "1f7e6e6bc4544ff7888b624b40244845";
DROP TABLE "79547fa0f7fa4e9582efa0fb2e3328f0";
DROP TABLE "356e2f996b5d498b90cd55ae5462cc16";
DROP TABLE "e21391cef98644dbbd6cf7d53c564866";
DROP TABLE "72edefa59afc4c99a1ba9a12cd3a7b7c";
DROP TABLE "87aeff87d7ec4eae9a2b0ed8d0bd8a8c";
DROP TABLE "6af20c8b6d954196a86d60faa29ab1aa";
DROP TABLE "c962d0d3987f4737a8e76f4f7ac3d7b3";
DROP TABLE "5e3bb0558d23443bae1f89f134094d92";
DROP TABLE "2d5bcc61cfc24874ab0848e496c4296f";
DROP TABLE "18362ffd1d8f47edac87ef1825d376b1";
DROP TABLE "bccd09a1d4e444398505954d3eb2397b";
DROP TABLE "9d72fa85b8db46b1baa533c2885c2e24";
DROP TABLE "5c6d5d2386de4e7187f28c08061c56e7";
DROP TABLE "44ca06a6e20d4c779f2248dc50fe0dfe";
DROP TABLE "fa96d6e7623045f6ab0ca6307178e65d";
DROP TABLE "88a4e3a49adc43eab72e6b7439fb941e";
DROP TABLE "39821552a04b4bf28220d4b0cf7d4f6a";
DROP TABLE "299d99a8022149aaaff84c5a094c03fc";
DROP TABLE "b5c5b267a13a417abe1e01d82e564c63";
DROP TABLE "fdf32555a59b4d6c8a8dd425a14d3474";
DROP TABLE "f615992650dc444d9c0678ab2aa6fff5";
DROP TABLE "f600f850bcd1499290dc6dd9a89cded2";
DROP TABLE "f54334b9f6d44a74abdfe3902465d63b";
DROP TABLE "5a8f06b8163e431a9d6a0193a88bc9fa";
DROP TABLE "c49cb44e391741798aad161dccc17c6b";
UPDATE "mendixsystem$version" SET "versionnumber" = '4.2', "lastsyncdate" = '20260804 14:18:13';
