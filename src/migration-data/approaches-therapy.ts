import {QueryRunner} from 'typeorm';
import {MethodsTherapyEnum} from '../entity/expert/MethodsTherapy';
import { ApproachesTherapyEnum } from '../entity/expert/ApproachesTherapy';

export const insertDataApproachesTherapy = async (queryRunner: QueryRunner) => {
  await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('approaches_therapy')
      .values([
            {name: ApproachesTherapyEnum.Integrative, title: 'Интегративный'},
            {name: ApproachesTherapyEnum.Humanistic, title: 'Гуманистический'},
            {name: ApproachesTherapyEnum.Existential, title: 'Экзистенциальный'},
            {name: ApproachesTherapyEnum.Gestalt, title: 'Гештальт'},
            {name: ApproachesTherapyEnum.CognitiveBehavioralTherapy, title: 'Когнитивно Поведенческая Терапия'},
            {name: ApproachesTherapyEnum.Psychodynamic, title: 'Психодинамический'},
            {name: ApproachesTherapyEnum.Systems, title: 'Системный подход'},
            {name: ApproachesTherapyEnum.RationallyEmotiveTherapy, title: 'Рационально - эмотивная терапия'},
            {name: ApproachesTherapyEnum.PositiveShorttermPsychotherapy, title: 'Позитивная краткосрочная психотерапия'},
            {name: ApproachesTherapyEnum.Narrative, title: 'Нарративная терапия'},
          ]
      )
      .execute();
};
