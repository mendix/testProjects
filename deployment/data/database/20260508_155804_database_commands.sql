CREATE GLOBAL TEMPORARY TABLE "mendixsystem$temporary_ids" ( "id" BIGINT NOT NULL ) ON COMMIT DELETE ROWS;
CREATE GLOBAL TEMPORARY TABLE "mendixsystem$tmp_associations" ( "parent" BIGINT NOT NULL, "child" BIGINT NOT NULL ) ON COMMIT DELETE ROWS;
CREATE TABLE "mendixsystem$data_change_event" (
	"sequence" BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
	"event_time" TIMESTAMP NULL,
	"change_type" SMALLINT NULL,
	"data" VARCHAR_IGNORECASE(2147483647) NULL,
	PRIMARY KEY("sequence"));
UPDATE "mendixsystem$version" SET "preanalysismigrationversionnumber" = '4.5.0';
