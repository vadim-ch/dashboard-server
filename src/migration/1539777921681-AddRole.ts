import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRole1539777921681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "User" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "role"`);
    }

}
