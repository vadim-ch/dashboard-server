import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1539635098010 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Expert" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" character varying NOT NULL, CONSTRAINT "PK_32dfd7e0c7021df7273a7f567e4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "Expert"`);
    }

}
