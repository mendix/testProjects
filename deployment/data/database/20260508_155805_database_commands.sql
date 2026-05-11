ALTER TABLE "myfirstmodule$town_city" DROP CONSTRAINT "uniq_myfirstmodule$town_city_myfirstmodule$townid";
DROP INDEX "idx_myfirstmodule$town_city_myfirstmodule$city_myfirstmodule$town";
ALTER TABLE "myfirstmodule$town_city" RENAME TO "517049ce23314ac6a993dc908d7f465f";
ALTER TABLE "myfirstmodule$country_continent" DROP CONSTRAINT "uniq_myfirstmodule$country_continent_myfirstmodule$countryid";
DROP INDEX "idx_myfirstmodule$country_continent_myfirstmodule$continent_myfirstmodule$country";
ALTER TABLE "myfirstmodule$country_continent" RENAME TO "27874abd589b4960976603336b620919";
ALTER TABLE "myfirstmodule$city_country" DROP CONSTRAINT "uniq_myfirstmodule$city_country_myfirstmodule$cityid";
DROP INDEX "idx_myfirstmodule$city_country_myfirstmodule$country_myfirstmodule$city";
ALTER TABLE "myfirstmodule$city_country" RENAME TO "e74a30de224a4dc4812b5df3c3351102";
ALTER TABLE "myfirstmodule$town" RENAME TO "c4f5bcd66e67418a9216cf40e18951a4";
ALTER TABLE "myfirstmodule$country" RENAME TO "6ef52987389b4625ae35ce41c6e22a6d";
ALTER TABLE "myfirstmodule$continent" RENAME TO "4ab97504067e4bf4882d15293eecb11b";
ALTER TABLE "myfirstmodule$city" RENAME TO "2113f987626b445bbe35ec8b956844b8";
DELETE FROM "mendixsystem$entity"  WHERE "id" = '6bd3e45f-5010-4213-9eb0-782f6d3f29af';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '6bd3e45f-5010-4213-9eb0-782f6d3f29af';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '6bd3e45f-5010-4213-9eb0-782f6d3f29af' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '6bd3e45f-5010-4213-9eb0-782f6d3f29af';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '6bd3e45f-5010-4213-9eb0-782f6d3f29af';
DELETE FROM "mendixsystem$entity"  WHERE "id" = '8aeb3a5e-c279-48df-8189-621c9ca786e5';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '8aeb3a5e-c279-48df-8189-621c9ca786e5';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '8aeb3a5e-c279-48df-8189-621c9ca786e5' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '8aeb3a5e-c279-48df-8189-621c9ca786e5';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '8aeb3a5e-c279-48df-8189-621c9ca786e5';
DELETE FROM "mendixsystem$entity"  WHERE "id" = '8d95cc45-64b6-459d-9de1-d3c70c90e94e';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = '8d95cc45-64b6-459d-9de1-d3c70c90e94e';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = '8d95cc45-64b6-459d-9de1-d3c70c90e94e' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = '8d95cc45-64b6-459d-9de1-d3c70c90e94e';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = '8d95cc45-64b6-459d-9de1-d3c70c90e94e';
DELETE FROM "mendixsystem$entity"  WHERE "id" = 'cd8bac3d-aa4f-4bdf-8f4e-68ace3a2b613';
DELETE FROM "mendixsystem$entityidentifier"  WHERE "id" = 'cd8bac3d-aa4f-4bdf-8f4e-68ace3a2b613';
DELETE FROM "mendixsystem$sequence"  WHERE "attribute_id" IN ( SELECT "id" FROM "mendixsystem$attribute" WHERE "entity_id" = 'cd8bac3d-aa4f-4bdf-8f4e-68ace3a2b613' );
DELETE FROM "mendixsystem$remote_primary_key"  WHERE "entity_id" = 'cd8bac3d-aa4f-4bdf-8f4e-68ace3a2b613';
DELETE FROM "mendixsystem$attribute"  WHERE "entity_id" = 'cd8bac3d-aa4f-4bdf-8f4e-68ace3a2b613';
CREATE TABLE "myfirstmodule$town" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(2147483647) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('5dda3961-84ea-48a4-ae58-0e8f53f32a89', 'MyFirstModule.Town', 'myfirstmodule$town', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('398f74ab-6a20-45cd-9b03-610e37b3a832', '5dda3961-84ea-48a4-ae58-0e8f53f32a89', 'Name', 'name', 30, 0, '', false);
CREATE TABLE "myfirstmodule$continent" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(2147483647) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('f4c5205a-3f21-4b4e-8893-488911c0d2ed', 'MyFirstModule.Continent', 'myfirstmodule$continent', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('35da86d6-235e-486f-9154-2ae751cfc511', 'f4c5205a-3f21-4b4e-8893-488911c0d2ed', 'Name', 'name', 30, 0, '', false);
CREATE TABLE "system$workflowendedusertaskoutcome" (
	"id" BIGINT NOT NULL,
	"outcome" VARCHAR_IGNORECASE(200) NULL,
	"time" TIMESTAMP NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('03c36ed6-7828-420c-9a27-23839d06215d', 'System.WorkflowEndedUserTaskOutcome', 'system$workflowendedusertaskoutcome', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('4423bf8d-4eab-44bd-ac71-cabf7350ac5b', '03c36ed6-7828-420c-9a27-23839d06215d', 'Outcome', 'outcome', 30, 200, '', false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('fe10bf82-e238-4b71-8b9f-27f96f04c8e6', '03c36ed6-7828-420c-9a27-23839d06215d', 'Time', 'time', 20, 0, '', false);
CREATE TABLE "myfirstmodule$category" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(200) NULL,
	"myfirstmodule$category_parent" BIGINT NULL,
	PRIMARY KEY("id"));
CREATE INDEX "idx_myfirstmodule$category_myfirstmodule$category_parent" ON "myfirstmodule$category" ("myfirstmodule$category_parent" ASC,"id" ASC);
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('f7c7457d-8866-4b8e-9d0b-41ec2eec82f4', 'MyFirstModule.Category', 'myfirstmodule$category', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('d268d524-3466-4732-8849-be380c0f517b', 'f7c7457d-8866-4b8e-9d0b-41ec2eec82f4', 'Name', 'name', 30, 200, '', false);
INSERT INTO "mendixsystem$index" ("id", "table_id", "index_name") VALUES ('13c0d5ef-152e-35d0-91df-2e9c32389ca4', 'f7c7457d-8866-4b8e-9d0b-41ec2eec82f4', 'idx_myfirstmodule$category_myfirstmodule$category_parent');
INSERT INTO "mendixsystem$index_column" ("index_id", "column_id", "sort_order", "ordinal") VALUES ('13c0d5ef-152e-35d0-91df-2e9c32389ca4', 'e3da819f-651a-4971-a5af-358fa831b45c', false, 0);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "storage_format") VALUES ('e3da819f-651a-4971-a5af-358fa831b45c', 'MyFirstModule.Category_Parent', 'myfirstmodule$category', 'f7c7457d-8866-4b8e-9d0b-41ec2eec82f4', 'f7c7457d-8866-4b8e-9d0b-41ec2eec82f4', 'id', 'myfirstmodule$category_parent', 1);
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
CREATE TABLE "myfirstmodule$city" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(2147483647) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('24f9b3a5-bdcd-432b-a6f4-5f33c794da11', 'MyFirstModule.City', 'myfirstmodule$city', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('6b5f8ca5-d1b8-4a40-a0a1-a977747b1c36', '24f9b3a5-bdcd-432b-a6f4-5f33c794da11', 'Name', 'name', 30, 0, '', false);
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
CREATE TABLE "myfirstmodule$country" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(2147483647) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", "entity_name", "table_name", "remote", "remote_primary_key") VALUES ('652bcc71-b457-477f-922f-58e3647c1535', 'MyFirstModule.Country', 'myfirstmodule$country', false, false);
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('071ad2cb-0641-4f5a-b8f8-29c6eca385ea', '652bcc71-b457-477f-922f-58e3647c1535', 'Name', 'name', 30, 0, '', false);
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
DELETE FROM "mendixsystem$association"  WHERE "id" = 'd5269542-2e23-477d-a941-ccad13723c37';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_myfirstmodule$town_city_myfirstmodule$townid' AND "column_id" = 'e7662920-006f-3470-977d-2c94e85deb67';
DELETE FROM "mendixsystem$association"  WHERE "id" = '012f4496-8fe7-4070-be0f-68466401b59a';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_myfirstmodule$country_continent_myfirstmodule$countryid' AND "column_id" = '654d5fcf-711a-3d0c-a0e9-1ed71bc6c826';
DELETE FROM "mendixsystem$association"  WHERE "id" = '8d271e74-daf9-4451-a68c-e8e2bf72c7f0';
DELETE FROM "mendixsystem$unique_constraint"  WHERE "name" = 'uniq_myfirstmodule$city_country_myfirstmodule$cityid' AND "column_id" = 'ee430064-5635-363d-9bcf-fb25be754203';
CREATE TABLE "system$workflowactivity_workflowsubprocess" (
	"system$workflowactivityid" BIGINT NOT NULL,
	"system$workflowsubprocessid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowactivityid","system$workflowsubprocessid"),
	CONSTRAINT "uniq_system$workflowactivity_workflowsubprocess_system$workflowactivityid" UNIQUE ("system$workflowactivityid"));
CREATE INDEX "idx_system$workflowactivity_workflowsubprocess_system$workflowsubprocess_system$workflowactivity" ON "system$workflowactivity_workflowsubprocess" ("system$workflowsubprocessid" ASC,"system$workflowactivityid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('b8b548a4-5b04-4ea6-b59a-5f2c2802969c', 'System.WorkflowActivity_WorkflowSubProcess', 'system$workflowactivity_workflowsubprocess', 'a5952592-bb2c-4798-9805-f9ff91ad97de', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'system$workflowactivityid', 'system$workflowsubprocessid', 'idx_system$workflowactivity_workflowsubprocess_system$workflowsubprocess_system$workflowactivity', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowactivity_workflowsubprocess_system$workflowactivityid', 'b8b548a4-5b04-4ea6-b59a-5f2c2802969c', '77eed144-4320-34d1-881f-742f55b26079');
CREATE TABLE "myfirstmodule$town_city" (
	"myfirstmodule$townid" BIGINT NOT NULL,
	"myfirstmodule$cityid" BIGINT NOT NULL,
	PRIMARY KEY("myfirstmodule$townid","myfirstmodule$cityid"),
	CONSTRAINT "uniq_myfirstmodule$town_city_myfirstmodule$townid" UNIQUE ("myfirstmodule$townid"));
CREATE INDEX "idx_myfirstmodule$town_city_myfirstmodule$city_myfirstmodule$town" ON "myfirstmodule$town_city" ("myfirstmodule$cityid" ASC,"myfirstmodule$townid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('dca19a68-37a6-48d9-9ef7-dc7ab59e7491', 'MyFirstModule.Town_City', 'myfirstmodule$town_city', '5dda3961-84ea-48a4-ae58-0e8f53f32a89', '24f9b3a5-bdcd-432b-a6f4-5f33c794da11', 'myfirstmodule$townid', 'myfirstmodule$cityid', 'idx_myfirstmodule$town_city_myfirstmodule$city_myfirstmodule$town', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_myfirstmodule$town_city_myfirstmodule$townid', 'dca19a68-37a6-48d9-9ef7-dc7ab59e7491', '15e0bab9-9597-3422-907a-7dac65be0362');
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
CREATE TABLE "system$workflowusertask_workflowsubprocess" (
	"system$workflowusertaskid" BIGINT NOT NULL,
	"system$workflowsubprocessid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskid","system$workflowsubprocessid"),
	CONSTRAINT "uniq_system$workflowusertask_workflowsubprocess_system$workflowusertaskid" UNIQUE ("system$workflowusertaskid"));
CREATE INDEX "idx_system$workflowusertask_workflowsubprocess_system$workflowsubprocess_system$workflowusertask" ON "system$workflowusertask_workflowsubprocess" ("system$workflowsubprocessid" ASC,"system$workflowusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('639df7bf-fe8e-4f68-bb17-55978a15a07b', 'System.WorkflowUserTask_WorkflowSubProcess', 'system$workflowusertask_workflowsubprocess', '3729d27c-735b-457a-b210-9dffb125c3f3', 'ed256e5b-42a9-406a-8d70-d4c24264de86', 'system$workflowusertaskid', 'system$workflowsubprocessid', 'idx_system$workflowusertask_workflowsubprocess_system$workflowsubprocess_system$workflowusertask', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowusertask_workflowsubprocess_system$workflowusertaskid', '639df7bf-fe8e-4f68-bb17-55978a15a07b', '68a9fe3f-7ce0-31b4-8427-f4e60caab809');
CREATE TABLE "system$workflowusertask_targetgroups" (
	"system$workflowusertaskid" BIGINT NOT NULL,
	"system$workflowgroupid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowusertaskid","system$workflowgroupid"));
CREATE INDEX "idx_system$workflowusertask_targetgroups_system$workflowgroup_system$workflowusertask" ON "system$workflowusertask_targetgroups" ("system$workflowgroupid" ASC,"system$workflowusertaskid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('3b215944-42bb-4113-bfb4-58b1f7b34460', 'System.WorkflowUserTask_TargetGroups', 'system$workflowusertask_targetgroups', '3729d27c-735b-457a-b210-9dffb125c3f3', '7582d0f8-a963-4fde-8535-e1b257b388d6', 'system$workflowusertaskid', 'system$workflowgroupid', 'idx_system$workflowusertask_targetgroups_system$workflowgroup_system$workflowusertask', 2);
CREATE TABLE "myfirstmodule$city_country" (
	"myfirstmodule$cityid" BIGINT NOT NULL,
	"myfirstmodule$countryid" BIGINT NOT NULL,
	PRIMARY KEY("myfirstmodule$cityid","myfirstmodule$countryid"),
	CONSTRAINT "uniq_myfirstmodule$city_country_myfirstmodule$cityid" UNIQUE ("myfirstmodule$cityid"));
CREATE INDEX "idx_myfirstmodule$city_country_myfirstmodule$country_myfirstmodule$city" ON "myfirstmodule$city_country" ("myfirstmodule$countryid" ASC,"myfirstmodule$cityid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('22fbffe4-2d89-4ab8-a616-1c271352d15f', 'MyFirstModule.City_Country', 'myfirstmodule$city_country', '24f9b3a5-bdcd-432b-a6f4-5f33c794da11', '652bcc71-b457-477f-922f-58e3647c1535', 'myfirstmodule$cityid', 'myfirstmodule$countryid', 'idx_myfirstmodule$city_country_myfirstmodule$country_myfirstmodule$city', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_myfirstmodule$city_country_myfirstmodule$cityid', '22fbffe4-2d89-4ab8-a616-1c271352d15f', '284a67c6-4130-3db7-b259-2611e2ca600c');
CREATE TABLE "system$workflowsubprocessdefinition_workflowdefinition" (
	"system$workflowsubprocessdefinitionid" BIGINT NOT NULL,
	"system$workflowdefinitionid" BIGINT NOT NULL,
	PRIMARY KEY("system$workflowsubprocessdefinitionid","system$workflowdefinitionid"),
	CONSTRAINT "uniq_system$workflowsubprocessdefinition_workflowdefinition_system$workflowsubprocessdefinitionid" UNIQUE ("system$workflowsubprocessdefinitionid"));
CREATE INDEX "idx_system$workflowsubprocessdefinition_workflowdefinition_system$workflowdefinition_system$workflowsubprocessdefinition" ON "system$workflowsubprocessdefinition_workflowdefinition" ("system$workflowdefinitionid" ASC,"system$workflowsubprocessdefinitionid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('cec39239-05f1-49d3-9274-d7b1e99852ac', 'System.WorkflowSubProcessDefinition_WorkflowDefinition', 'system$workflowsubprocessdefinition_workflowdefinition', 'abd99484-42cd-4ef8-93b3-bd161dc41422', '5c570d3b-7b31-44fe-abd6-269a234584c5', 'system$workflowsubprocessdefinitionid', 'system$workflowdefinitionid', 'idx_system$workflowsubprocessdefinition_workflowdefinition_system$workflowdefinition_system$workflowsubprocessdefinition', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_system$workflowsubprocessdefinition_workflowdefinition_system$workflowsubprocessdefinitionid', 'cec39239-05f1-49d3-9274-d7b1e99852ac', '7a8d8612-72b1-3447-b842-31885e3e1f40');
CREATE TABLE "myfirstmodule$country_continent" (
	"myfirstmodule$countryid" BIGINT NOT NULL,
	"myfirstmodule$continentid" BIGINT NOT NULL,
	PRIMARY KEY("myfirstmodule$countryid","myfirstmodule$continentid"),
	CONSTRAINT "uniq_myfirstmodule$country_continent_myfirstmodule$countryid" UNIQUE ("myfirstmodule$countryid"));
CREATE INDEX "idx_myfirstmodule$country_continent_myfirstmodule$continent_myfirstmodule$country" ON "myfirstmodule$country_continent" ("myfirstmodule$continentid" ASC,"myfirstmodule$countryid" ASC);
INSERT INTO "mendixsystem$association" ("id", "association_name", "table_name", "parent_entity_id", "child_entity_id", "parent_column_name", "child_column_name", "index_name", "storage_format") VALUES ('6c4d10b2-72b9-431c-969a-e349cf63c63d', 'MyFirstModule.Country_Continent', 'myfirstmodule$country_continent', '652bcc71-b457-477f-922f-58e3647c1535', 'f4c5205a-3f21-4b4e-8893-488911c0d2ed', 'myfirstmodule$countryid', 'myfirstmodule$continentid', 'idx_myfirstmodule$country_continent_myfirstmodule$continent_myfirstmodule$country', 2);
INSERT INTO "mendixsystem$unique_constraint" ("name", "table_id", "column_id") VALUES ('uniq_myfirstmodule$country_continent_myfirstmodule$countryid', '6c4d10b2-72b9-431c-969a-e349cf63c63d', 'f7d66867-ecb3-3e4c-9823-b24b4c90d4ed');
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
DROP TABLE "517049ce23314ac6a993dc908d7f465f";
DROP TABLE "27874abd589b4960976603336b620919";
DROP TABLE "e74a30de224a4dc4812b5df3c3351102";
DROP TABLE "c4f5bcd66e67418a9216cf40e18951a4";
DROP TABLE "6ef52987389b4625ae35ce41c6e22a6d";
DROP TABLE "4ab97504067e4bf4882d15293eecb11b";
DROP TABLE "2113f987626b445bbe35ec8b956844b8";
UPDATE "mendixsystem$version" SET "versionnumber" = '4.2', "lastsyncdate" = '20260508 13:58:05';
