import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCabinetEmpty1539699152105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Cabinet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "address" character varying NOT NULL, "availableHours" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_f84ae16312edbef9c60a1e37748" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "addresses" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD "hours" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Cabinet" ADD CONSTRAINT "FK_5e9cb45466706d6e0dba7d8b42d" FOREIGN KEY ("ownerId") REFERENCES "Expert"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Cabinet" DROP CONSTRAINT "FK_5e9cb45466706d6e0dba7d8b42d"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "hours"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP COLUMN "addresses"`);
        await queryRunner.query(`DROP TABLE "Cabinet"`);
    }

}
