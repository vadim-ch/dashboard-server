import {MigrationInterface, QueryRunner} from "typeorm";

export class Changes1539940293435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "expert_sessionformat_enum" AS ENUM('meeting', 'video', 'audio')`);
        await queryRunner.query(`ALTER TABLE "expert" ADD "sessionFormat" "expert_sessionformat_enum" array`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "expert" DROP COLUMN "sessionFormat"`);
        await queryRunner.query(`DROP TYPE "expert_sessionformat_enum"`);
    }

}
