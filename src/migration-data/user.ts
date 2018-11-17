import {QueryRunner} from 'typeorm';
import {UserRole} from "../entity/User";

export const insertDataUser = async (queryRunner: QueryRunner) => {
  await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('user')
      .values([
            {
              email: 'admin@admin.ru',
              role: UserRole.Admin
            },
          ]
      )
      .execute();
};
