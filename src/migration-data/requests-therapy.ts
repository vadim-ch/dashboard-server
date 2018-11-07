import {QueryRunner} from 'typeorm';
import {MethodsTherapyEnum} from '../entity/expert/MethodsTherapy';
import { ApproachesTherapyEnum } from '../entity/expert/ApproachesTherapy';

export const insertDataRequestsTherapy = async (queryRunner: QueryRunner) => {
  await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('requests_therapy')
      .values([
            {description: 'трудности в отношениях с партнером (конфликты, недоверие, ревность, отсутствие близости, тревога, созовисимость, желание сохранить отношения)'},
            {description: 'трудности в отношениях с другими людьми (конфликты на работе, трудности в построении дружеских отношений, налаживании социальных связей и т.д.)'},
            {description: 'трудности в отношении с собой (самооценка, вера в себя и свои силы)'},
            {description: 'тревоги и страхи'},
            {description: 'чувство одиночества'},
            {description: 'обиды и чувство вины'},
            {description: 'ощущение тупика, потеря жизненных целей и ориентиров, непонимание куда двигаться дальше'},
            {description: 'страх оценки и осуждения'},
            {description: 'не понимание своих эмоций'},
            {description: 'вопросы карьеры'},
            {description: 'сложности в отношениях с детьми'},
            {description: 'утрата и горе'},
            {description: 'панические атаки'},
            {description: 'вспышки гнева'},
            {description: 'нарушения пищевого поведения'},
            {description: 'зависимости'},
            {description: 'лень, апатия'},
            {description: 'депрессия'},
            {description: 'жизненные кризисы'},
            {description: 'суицидальные мысли'},
            {description: 'вопросы самореализации'},
            {description: 'трудность значимого выбора'},
          ]
      )
      .execute();
};
