import {MigrationInterface, QueryRunner} from "typeorm";

export class Fixes1540143754250 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "expert" DROP CONSTRAINT "FK_f90f651a2c9953c7310220a7296"`);
        await queryRunner.query(`ALTER TABLE "expert" RENAME COLUMN "methodsTherapyId" TO "directionsTherapy"`);
        await queryRunner.query(`CREATE TABLE "expert_methods_therapy_methods_therapy" ("expertId" uuid NOT NULL, "methodsTherapyId" integer NOT NULL, CONSTRAINT "PK_1c6ea8cf8ba216abe35a196c953" PRIMARY KEY ("expertId", "methodsTherapyId"))`);
        await queryRunner.query(`ALTER TYPE "methods_therapy_name_enum" RENAME TO "methods_therapy_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "methods_therapy_name_enum" AS ENUM('sand-therapy', 'art-therapy', 'metaphoric-cards', 'monodrama', 'fairy-tale-therapy', 'bodyoriented-therapy', 'danceTherapy', 'image-therapy', 'meditation')`);
        await queryRunner.query(`ALTER TABLE "methods_therapy" ALTER COLUMN "name" TYPE "methods_therapy_name_enum" USING "name"::"text"::"methods_therapy_name_enum"`);
        await queryRunner.query(`DROP TYPE "methods_therapy_name_enum_old"`);
        await queryRunner.query(`ALTER TABLE "expert" DROP COLUMN "directionsTherapy"`);
        await queryRunner.query(`CREATE TYPE "expert_directionstherapy_enum" AS ENUM('family-therapy', 'individual-therapy', 'group-therapy')`);
        await queryRunner.query(`ALTER TABLE "expert" ADD "directionsTherapy" "expert_directionstherapy_enum" array`);
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" ADD CONSTRAINT "FK_920bf37d5a00bf27ad67a23bf22" FOREIGN KEY ("expertId") REFERENCES "expert"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" ADD CONSTRAINT "FK_dccd4cc0c7795cd1b3e83d36e60" FOREIGN KEY ("methodsTherapyId") REFERENCES "methods_therapy"("id") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" DROP CONSTRAINT "FK_dccd4cc0c7795cd1b3e83d36e60"`);
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" DROP CONSTRAINT "FK_920bf37d5a00bf27ad67a23bf22"`);
        await queryRunner.query(`ALTER TABLE "expert" DROP COLUMN "directionsTherapy"`);
        await queryRunner.query(`DROP TYPE "expert_directionstherapy_enum"`);
        await queryRunner.query(`ALTER TABLE "expert" ADD "directionsTherapy" integer`);
        await queryRunner.query(`CREATE TYPE "methods_therapy_name_enum_old" AS ENUM('sand-therapy', 'art-therapy', 'metaphoric-cards', 'monodrama', 'bodyoriented-therapy', 'danceTherapy', 'image-therapy', 'meditation')`);
        await queryRunner.query(`ALTER TABLE "methods_therapy" ALTER COLUMN "name" TYPE "methods_therapy_name_enum_old" USING "name"::"text"::"methods_therapy_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "methods_therapy_name_enum"`);
        await queryRunner.query(`ALTER TYPE "methods_therapy_name_enum_old" RENAME TO "methods_therapy_name_enum"`);
        await queryRunner.query(`DROP TABLE "expert_methods_therapy_methods_therapy"`);
        await queryRunner.query(`ALTER TABLE "expert" RENAME COLUMN "directionsTherapy" TO "methodsTherapyId"`);
        await queryRunner.query(`ALTER TABLE "expert" ADD CONSTRAINT "FK_f90f651a2c9953c7310220a7296" FOREIGN KEY ("methodsTherapyId") REFERENCES "methods_therapy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
