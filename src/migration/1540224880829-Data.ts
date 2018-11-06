import {MigrationInterface, QueryRunner} from "typeorm";
import { insertDataMethodsTherapy } from '../migration-data/methods-therapy';
import { insertDataApproachesTherapy } from '../migration-data/approaches-therapy';

export class Data1540224880829 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await insertDataMethodsTherapy(queryRunner);
    await insertDataApproachesTherapy(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
