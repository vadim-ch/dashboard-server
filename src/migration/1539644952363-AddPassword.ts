import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPassword1539644952363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "password"`);
    }

}
