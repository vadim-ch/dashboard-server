import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1542624557288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "cabinet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "address" character varying NOT NULL, "availableHours" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_6e1aaa59022d432d8cf3df7ef46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "methods_therapy_name_enum" AS ENUM('sand-therapy', 'art-therapy', 'metaphoric-cards', 'monodrama', 'fairy-tale-therapy', 'bodyoriented-therapy', 'danceTherapy', 'image-therapy', 'meditation')`);
        await queryRunner.query(`CREATE TABLE "methods_therapy" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" "methods_therapy_name_enum" NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_8f3fbefc136ccbe85c09121ba7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requests_therapy" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying, CONSTRAINT "PK_2124e7168aba74b5349eaf5c47a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "approaches_therapy_name_enum" AS ENUM('integrative', 'humanistic', 'existential', 'gestalt', 'cognitive-behavioral-therapy', 'psychodynamic', 'Systems', 'rationally-emotive-therapy', 'positive-shortterm-psychotherapy', 'narrative')`);
        await queryRunner.query(`CREATE TABLE "approaches_therapy" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" "approaches_therapy_name_enum" NOT NULL, "title" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_de039e163a96e1e6a246c19edb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "expert_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TYPE "expert_sessionformat_enum" AS ENUM('meeting', 'video', 'audio')`);
        await queryRunner.query(`CREATE TYPE "expert_qualifications_enum" AS ENUM('psychologist', 'psychotherapist', 'psychiatrist', 'psychoanalyst')`);
        await queryRunner.query(`CREATE TYPE "expert_directionstherapy_enum" AS ENUM('family-therapy', 'individual-therapy', 'group-therapy')`);
        await queryRunner.query(`CREATE TABLE "expert" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying, "middleName" character varying, "lastName" character varying, "avatar" character varying, "description" character varying, "birthday" date, "gender" "expert_gender_enum", "location" character varying, "sessionTime" character varying, "sessionPrice" character varying, "sessionFormat" "expert_sessionformat_enum" array, "qualifications" "expert_qualifications_enum" array, "ownTherapyHours" integer, "directionsTherapy" "expert_directionstherapy_enum" array, CONSTRAINT "REL_39d99079a5227599160c408b22" UNIQUE ("userId"), CONSTRAINT "PK_0062630832658e718267ce2941f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('client', 'expert', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying, "role" "user_role_enum" NOT NULL, "refreshTokenMap" hstore, "active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "nickname" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "age" character varying, CONSTRAINT "REL_ad3b4bf8dd18a1d467c5c0fc13" UNIQUE ("userId"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expert_approaches_therapy_approaches_therapy" ("expertId" uuid NOT NULL, "approachesTherapyId" integer NOT NULL, CONSTRAINT "PK_8f3aa44cd0acf7ddf967ed1e0ca" PRIMARY KEY ("expertId", "approachesTherapyId"))`);
        await queryRunner.query(`CREATE TABLE "expert_methods_therapy_methods_therapy" ("expertId" uuid NOT NULL, "methodsTherapyId" integer NOT NULL, CONSTRAINT "PK_1c6ea8cf8ba216abe35a196c953" PRIMARY KEY ("expertId", "methodsTherapyId"))`);
        await queryRunner.query(`CREATE TABLE "expert_requests_therapy_requests_therapy" ("expertId" uuid NOT NULL, "requestsTherapyId" integer NOT NULL, CONSTRAINT "PK_3955c3c19d4316666426805c75c" PRIMARY KEY ("expertId", "requestsTherapyId"))`);
        await queryRunner.query(`ALTER TABLE "cabinet" ADD CONSTRAINT "FK_44ef5fe2613fc26b163eec35d34" FOREIGN KEY ("ownerId") REFERENCES "expert"("id")`);
        await queryRunner.query(`ALTER TABLE "expert" ADD CONSTRAINT "FK_39d99079a5227599160c408b22c" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "expert_approaches_therapy_approaches_therapy" ADD CONSTRAINT "FK_281d72edf501a35c4e9629c4f15" FOREIGN KEY ("expertId") REFERENCES "expert"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expert_approaches_therapy_approaches_therapy" ADD CONSTRAINT "FK_3387d123a96110cacb3ef38cf09" FOREIGN KEY ("approachesTherapyId") REFERENCES "approaches_therapy"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" ADD CONSTRAINT "FK_920bf37d5a00bf27ad67a23bf22" FOREIGN KEY ("expertId") REFERENCES "expert"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" ADD CONSTRAINT "FK_dccd4cc0c7795cd1b3e83d36e60" FOREIGN KEY ("methodsTherapyId") REFERENCES "methods_therapy"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expert_requests_therapy_requests_therapy" ADD CONSTRAINT "FK_f1ef54a46f56c9ef71455b22990" FOREIGN KEY ("expertId") REFERENCES "expert"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expert_requests_therapy_requests_therapy" ADD CONSTRAINT "FK_0fad7815e322c29afd30941014e" FOREIGN KEY ("requestsTherapyId") REFERENCES "requests_therapy"("id") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "expert_requests_therapy_requests_therapy" DROP CONSTRAINT "FK_0fad7815e322c29afd30941014e"`);
        await queryRunner.query(`ALTER TABLE "expert_requests_therapy_requests_therapy" DROP CONSTRAINT "FK_f1ef54a46f56c9ef71455b22990"`);
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" DROP CONSTRAINT "FK_dccd4cc0c7795cd1b3e83d36e60"`);
        await queryRunner.query(`ALTER TABLE "expert_methods_therapy_methods_therapy" DROP CONSTRAINT "FK_920bf37d5a00bf27ad67a23bf22"`);
        await queryRunner.query(`ALTER TABLE "expert_approaches_therapy_approaches_therapy" DROP CONSTRAINT "FK_3387d123a96110cacb3ef38cf09"`);
        await queryRunner.query(`ALTER TABLE "expert_approaches_therapy_approaches_therapy" DROP CONSTRAINT "FK_281d72edf501a35c4e9629c4f15"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a"`);
        await queryRunner.query(`ALTER TABLE "expert" DROP CONSTRAINT "FK_39d99079a5227599160c408b22c"`);
        await queryRunner.query(`ALTER TABLE "cabinet" DROP CONSTRAINT "FK_44ef5fe2613fc26b163eec35d34"`);
        await queryRunner.query(`DROP TABLE "expert_requests_therapy_requests_therapy"`);
        await queryRunner.query(`DROP TABLE "expert_methods_therapy_methods_therapy"`);
        await queryRunner.query(`DROP TABLE "expert_approaches_therapy_approaches_therapy"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "expert"`);
        await queryRunner.query(`DROP TYPE "expert_directionstherapy_enum"`);
        await queryRunner.query(`DROP TYPE "expert_qualifications_enum"`);
        await queryRunner.query(`DROP TYPE "expert_sessionformat_enum"`);
        await queryRunner.query(`DROP TYPE "expert_gender_enum"`);
        await queryRunner.query(`DROP TABLE "approaches_therapy"`);
        await queryRunner.query(`DROP TYPE "approaches_therapy_name_enum"`);
        await queryRunner.query(`DROP TABLE "requests_therapy"`);
        await queryRunner.query(`DROP TABLE "methods_therapy"`);
        await queryRunner.query(`DROP TYPE "methods_therapy_name_enum"`);
        await queryRunner.query(`DROP TABLE "cabinet"`);
    }

}
