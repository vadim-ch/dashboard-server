import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTables1540247403233 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "requests_therapy_name_enum" AS ENUM()`);
        await queryRunner.query(`CREATE TABLE "requests_therapy" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" "requests_therapy_name_enum" NOT NULL, "title" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_2124e7168aba74b5349eaf5c47a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "approaches_therapy_name_enum" AS ENUM()`);
        await queryRunner.query(`CREATE TABLE "approaches_therapy" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" "approaches_therapy_name_enum" NOT NULL, "title" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_de039e163a96e1e6a246c19edb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expert_approaches_therapy_approaches_therapy" ("expertId" uuid NOT NULL, "approachesTherapyId" integer NOT NULL, CONSTRAINT "PK_8f3aa44cd0acf7ddf967ed1e0ca" PRIMARY KEY ("expertId", "approachesTherapyId"))`);
        await queryRunner.query(`CREATE TABLE "expert_requests_therapy_requests_therapy" ("expertId" uuid NOT NULL, "requestsTherapyId" integer NOT NULL, CONSTRAINT "PK_3955c3c19d4316666426805c75c" PRIMARY KEY ("expertId", "requestsTherapyId"))`);
        await queryRunner.query(`ALTER TABLE "methods_therapy" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expert_approaches_therapy_approaches_therapy" ADD CONSTRAINT "FK_281d72edf501a35c4e9629c4f15" FOREIGN KEY ("expertId") REFERENCES "expert"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expert_approaches_therapy_approaches_therapy" ADD CONSTRAINT "FK_3387d123a96110cacb3ef38cf09" FOREIGN KEY ("approachesTherapyId") REFERENCES "approaches_therapy"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expert_requests_therapy_requests_therapy" ADD CONSTRAINT "FK_f1ef54a46f56c9ef71455b22990" FOREIGN KEY ("expertId") REFERENCES "expert"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expert_requests_therapy_requests_therapy" ADD CONSTRAINT "FK_0fad7815e322c29afd30941014e" FOREIGN KEY ("requestsTherapyId") REFERENCES "requests_therapy"("id") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "expert_requests_therapy_requests_therapy" DROP CONSTRAINT "FK_0fad7815e322c29afd30941014e"`);
        await queryRunner.query(`ALTER TABLE "expert_requests_therapy_requests_therapy" DROP CONSTRAINT "FK_f1ef54a46f56c9ef71455b22990"`);
        await queryRunner.query(`ALTER TABLE "expert_approaches_therapy_approaches_therapy" DROP CONSTRAINT "FK_3387d123a96110cacb3ef38cf09"`);
        await queryRunner.query(`ALTER TABLE "expert_approaches_therapy_approaches_therapy" DROP CONSTRAINT "FK_281d72edf501a35c4e9629c4f15"`);
        await queryRunner.query(`ALTER TABLE "methods_therapy" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "expert_requests_therapy_requests_therapy"`);
        await queryRunner.query(`DROP TABLE "expert_approaches_therapy_approaches_therapy"`);
        await queryRunner.query(`DROP TABLE "approaches_therapy"`);
        await queryRunner.query(`DROP TYPE "approaches_therapy_name_enum"`);
        await queryRunner.query(`DROP TABLE "requests_therapy"`);
        await queryRunner.query(`DROP TYPE "requests_therapy_name_enum"`);
    }

}
