import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeIdStrategy1539638836099 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "PK_32dfd7e0c7021df7273a7f567e4"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "PK_32dfd7e0c7021df7273a7f567e4" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "PK_32dfd7e0c7021df7273a7f567e4"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "PK_32dfd7e0c7021df7273a7f567e4" PRIMARY KEY ("id")`);
    }

}
