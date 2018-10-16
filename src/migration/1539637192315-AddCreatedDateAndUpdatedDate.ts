import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedDateAndUpdatedDate1539637192315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "createdDate"`);
    }

}
