import {QueryRunner} from 'typeorm';
import {MethodsTherapyEnum} from '../entity/expert/MethodsTherapy';

export const insertDataMethodsTherapy = async (queryRunner: QueryRunner) => {
  await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('methods_therapy')
      .values([
            {name: MethodsTherapyEnum.MetaphoricCards, title: 'Метафорические карты'},
            {name: MethodsTherapyEnum.ArtTherapy, title: 'Арт терапия'},
            {name: MethodsTherapyEnum.SandTherapy, title: 'Песочная терапия'},
            {name: MethodsTherapyEnum.Monodrama, title: 'Монодрама'},
            {name: MethodsTherapyEnum.FairyTaleTherapy, title: 'Сказко-терапия'},
            {name: MethodsTherapyEnum.BodyorientedTherapy, title: 'Телесно-ориентированная терапия'},
            {name: MethodsTherapyEnum.DanceTherapy, title: 'Танцевальная терапия'},
            {name: MethodsTherapyEnum.ImageTherapy, title: 'Работа с образами'},
            {name: MethodsTherapyEnum.Meditation, title: 'Медитация'},
          ]
      )
      .execute();
};
