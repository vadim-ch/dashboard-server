import {MigrationInterface, QueryRunner} from "typeorm";

export class Data1542624743686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await insertDataMethodsTherapy(queryRunner);
      await insertDataApproachesTherapy(queryRunner);
      await insertDataRequestsTherapy(queryRunner);
      await insertDataUser(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
