ALTER TABLE "myfirstmodule$data" ADD "valueclassmode" VARCHAR_IGNORECASE(2147483647) NULL;
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('9d0325bb-05ee-4ee1-8f7d-de1e86bac418', '19006d31-43e4-44ba-80b4-49d163fb272e', 'ValueClassMode', 'valueclassmode', 30, 0, '', false);
UPDATE "mendixsystem$version" SET "versionnumber" = '4.2', "lastsyncdate" = '20260512 14:22:08';
