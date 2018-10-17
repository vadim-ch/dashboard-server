import {MigrationInterface, QueryRunner} from "typeorm";

export class RefactorDatabase1539774870325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "nickname" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "age" character varying, CONSTRAINT "PK_b79874c8d411b839b9ccc301972" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "refreshTokenMap"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "addresses"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "middleName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD "expertId" uuid`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_6bb9c040ff42a3e964b3bad9ba5" UNIQUE ("expertId")`);
        await queryRunner.query(`ALTER TABLE "User" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_a6e28d1fc908a9f16f14102d5f8" UNIQUE ("clientId")`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_6bb9c040ff42a3e964b3bad9ba5" FOREIGN KEY ("expertId") REFERENCES "Expert"("id")`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_a6e28d1fc908a9f16f14102d5f8" FOREIGN KEY ("clientId") REFERENCES "Client"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_a6e28d1fc908a9f16f14102d5f8"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_6bb9c040ff42a3e964b3bad9ba5"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_a6e28d1fc908a9f16f14102d5f8"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_6bb9c040ff42a3e964b3bad9ba5"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "expertId"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "middleName"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "role" character varying`);
        await queryRunner.query(`ALTER TABLE "User" ADD "age" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "addresses" character varying`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "refreshTokenMap" hstore`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "role" character varying`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "Client"`);
    }

}
