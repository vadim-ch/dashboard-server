import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1539815024290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Cabinet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "address" character varying NOT NULL, "availableHours" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_f84ae16312edbef9c60a1e37748" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Expert" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "middleName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" character varying NOT NULL, "hours" character varying, CONSTRAINT "REL_d2b6f17832fd5eb97cc3701d59" UNIQUE ("userId"), CONSTRAINT "PK_32dfd7e0c7021df7273a7f567e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "refreshTokenMap" hstore, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "nickname" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "age" character varying, CONSTRAINT "REL_a874c0f53826c8de98f7f1ca41" UNIQUE ("userId"), CONSTRAINT "PK_b79874c8d411b839b9ccc301972" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Cabinet" ADD CONSTRAINT "FK_5e9cb45466706d6e0dba7d8b42d" FOREIGN KEY ("ownerId") REFERENCES "Expert"("id")`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "FK_d2b6f17832fd5eb97cc3701d597" FOREIGN KEY ("userId") REFERENCES "User"("id")`);
        await queryRunner.query(`ALTER TABLE "Client" ADD CONSTRAINT "FK_a874c0f53826c8de98f7f1ca414" FOREIGN KEY ("userId") REFERENCES "User"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "Client" DROP CONSTRAINT "FK_a874c0f53826c8de98f7f1ca414"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "FK_d2b6f17832fd5eb97cc3701d597"`);
        await queryRunner.query(`ALTER TABLE "Cabinet" DROP CONSTRAINT "FK_5e9cb45466706d6e0dba7d8b42d"`);
        await queryRunner.query(`DROP TABLE "Client"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Expert"`);
        await queryRunner.query(`DROP TABLE "Cabinet"`);
    }

}
