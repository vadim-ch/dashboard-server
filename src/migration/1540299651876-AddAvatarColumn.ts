import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAvatarColumn1540299651876 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "expert" ADD "avatar" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "expert" DROP COLUMN "avatar"`);
  }

}
