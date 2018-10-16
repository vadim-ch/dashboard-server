import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeCabinetModel1539700014634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" ALTER COLUMN "addresses" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" ALTER COLUMN "addresses" SET NOT NULL`);
    }

}
