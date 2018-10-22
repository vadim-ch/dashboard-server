import {MigrationInterface, QueryRunner} from "typeorm";
import { insertDataMethodsTherapy } from '../migration-data/methods-therapy';

export class Data1540224880829 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await insertDataMethodsTherapy(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
