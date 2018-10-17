import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeCabinetModel1539700071663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" ALTER COLUMN "hours" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" ALTER COLUMN "hours" SET NOT NULL`);
    }

}