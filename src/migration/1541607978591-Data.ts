import {MigrationInterface, QueryRunner} from "typeorm";
import { insertDataMethodsTherapy } from '../migration-data/methods-therapy';
import { insertDataApproachesTherapy } from '../migration-data/approaches-therapy';
import { insertDataRequestsTherapy } from '../migration-data/requests-therapy';

export class Data1541607978591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await insertDataMethodsTherapy(queryRunner);
      await insertDataApproachesTherapy(queryRunner);
      await insertDataRequestsTherapy(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
