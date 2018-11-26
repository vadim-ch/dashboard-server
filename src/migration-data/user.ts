import { QueryRunner } from 'typeorm';
import { UserRole } from '../entity/User';

export const insertDataUser = async (queryRunner: QueryRunner) => {
  await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('user')
      .values([
            {
              email: process.env['MAIN_EMAIL_LOGIN'],
              role: UserRole.Admin
            },
          ]
      )
      .execute();
};
