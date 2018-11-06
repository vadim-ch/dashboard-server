import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ApproachesTherapyEnum {
  Integrative = 'integrative', // Интегративный (добавляется автоматически, если человек выбирает несколько подходов)
  Humanistic = 'humanistic', // Гуманистический
  Existential = 'existential', // Экзистенциальный
  Gestalt = 'gestalt', // Гештальт
  CognitiveBehavioralTherapy = 'cognitive-behavioral-therapy', // Когнитивно Поведенческая Терапия
  Psychodynamic = 'psychodynamic', // Психодинамический
  Systems = 'Systems', // Системный подход
  RationallyEmotiveTherapy = 'rationally-emotive-therapy', // Рационально - эмотивная терапия
  PositiveShorttermPsychotherapy = 'positive-shortterm-psychotherapy', // Позитивная краткосрочная психотерапия
  Narrative = 'narrative', // Нарративная терапия
}

@Entity()
export class ApproachesTherapy {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({type: 'enum', enum: ApproachesTherapyEnum})
  name: string;

  @Column()
  title: string;

  @Column({nullable: true})
  description: string;
}
