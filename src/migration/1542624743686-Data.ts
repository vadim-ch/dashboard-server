import {MigrationInterface, QueryRunner} from "typeorm";
import { insertDataMethodsTherapy } from '../migration-data/methods-therapy';
import { insertDataApproachesTherapy } from '../migration-data/approaches-therapy';
import { insertDataRequestsTherapy } from '../migration-data/requests-therapy';
import { insertDataUser } from '../migration-data/user';

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
