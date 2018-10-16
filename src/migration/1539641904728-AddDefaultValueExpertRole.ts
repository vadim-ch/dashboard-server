import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDefaultValueExpertRole1539641904728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" ADD "role" character varying`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "refreshTokenMap" hstore`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "refreshTokenMap"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "role"`);
    }

}
