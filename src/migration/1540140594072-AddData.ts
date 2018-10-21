import {MigrationInterface, QueryRunner} from "typeorm";
import {insertDataMethodsTherapy} from "../migration-data/methods-therapy";

export class AddData1540140594072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await insertDataMethodsTherapy(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
