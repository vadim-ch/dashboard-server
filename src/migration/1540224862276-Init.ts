import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1540224862276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "cabinet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "address" character varying NOT NULL, "availableHours" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_6e1aaa59022d432d8cf3df7ef46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "methods_therapy_name_enum" AS ENUM('sand-therapy', 'art-therapy', 'metaphoric-cards', 'monodrama', 'fairy-tale-therapy', 'bodyoriented-therapy', 'danceTherapy', 'image-therapy', 'meditation')`);
        await queryRunner.query(`CREATE TABLE "methods_therapy" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" "methods_therapy_name_enum", "title" character varying NOT NULL, CONSTRAINT "PK_8f3fbefc136ccbe85c09121ba7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "expert_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TYPE "expert_sessionformat_enum" AS ENUM('meeting', 'video', 'audio')`);
        await queryRunner.query(`CREATE TYPE "expert_qualifications_enum" AS ENUM('psychologist', 'psychotherapist', 'psychiatrist', 'psychoanalyst')`);
        await queryRunner.query(`CREATE TYPE "expert_directionstherapy_enum" AS ENUM('family-therapy', 'individual-therapy', 'group-therapy')`);
        await queryRunner.query(`CREATE TABLE "expert" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "middleName" character varying NOT NULL, "lastName" character varying NOT NULL, "description" character varying, "birthday" date, "gender" "expert_gender_enum", "location" character varying, "sessionTime" character varying, "sessionPrice" character varying, "sessionFormat" "expert_sessionformat_enum" array, "qualifications" "expert_qualifications_enum" array, "ownTherapyHours" integer, "directionsTherapy" "expert_directionstherapy_enum" array, CONSTRAINT "REL_39d99079a5227599160c408b22" UNIQUE ("userId"), CONSTRAINT "PK_0062630832658e718267ce2941f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "refreshTokenMap" hstore, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "nickname" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "age" character varying, CONSTRAINT "REL_ad3b4bf8dd18a1d467c5c0fc13" UNIQUE ("userId"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expert_methods_therapy_methods_therapy" ("expertId" uuid NOT NULL, "methodsTherapyId" integer NOT NULL, CONSTRAINT "PK_1c6ea8cf8ba216abe35a196c953" PRIMARY KEY ("expertId", "methodsTherapyId"))`);
        await queryRunner.query(`ALTER TABLE "cabinet" ADD CONSTRAINT "FK_44ef5fe2613fc26b163eec35d34" FOREIGN KEY ("ownerId") REFERENCES "expert"("id")`);
        await queryRunner.query(`ALTER TABLE "expert" ADD CONSTRAINT "FK_39d99079a5227599160c408b22c" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" ADD CONSTRAINT "FK_920bf37d5a00bf27ad67a23bf22" FOREIGN KEY ("expertId") REFERENCES "expert"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" ADD CONSTRAINT "FK_dccd4cc0c7795cd1b3e83d36e60" FOREIGN KEY ("methodsTherapyId") REFERENCES "methods_therapy"("id") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" DROP CONSTRAINT "FK_dccd4cc0c7795cd1b3e83d36e60"`);
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" DROP CONSTRAINT "FK_920bf37d5a00bf27ad67a23bf22"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a"`);
        await queryRunner.query(`ALTER TABLE "expert" DROP CONSTRAINT "FK_39d99079a5227599160c408b22c"`);
        await queryRunner.query(`ALTER TABLE "cabinet" DROP CONSTRAINT "FK_44ef5fe2613fc26b163eec35d34"`);
        await queryRunner.query(`DROP TABLE "expert_methods_therapy_methods_therapy"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "expert"`);
        await queryRunner.query(`DROP TYPE "expert_directionstherapy_enum"`);
        await queryRunner.query(`DROP TYPE "expert_qualifications_enum"`);
        await queryRunner.query(`DROP TYPE "expert_sessionformat_enum"`);
        await queryRunner.query(`DROP TYPE "expert_gender_enum"`);
        await queryRunner.query(`DROP TABLE "methods_therapy"`);
        await queryRunner.query(`DROP TYPE "methods_therapy_name_enum"`);
        await queryRunner.query(`DROP TABLE "cabinet"`);
    }

}
