import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSessionPrice1539883633629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "expert" ADD "sessionPrice" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "expert" DROP COLUMN "sessionPrice"`);
    }

}
