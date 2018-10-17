import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserIdForExpert1539797445127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "UQ_d2b6f17832fd5eb97cc3701d597" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "FK_d2b6f17832fd5eb97cc3701d597" FOREIGN KEY ("userId") REFERENCES "Expert"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "FK_d2b6f17832fd5eb97cc3701d597"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "UQ_d2b6f17832fd5eb97cc3701d597"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "userId"`);
    }

}
