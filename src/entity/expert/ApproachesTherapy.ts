import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ApproachesTherapyEnum {
//   1) Интегративный (добавляется автоматически, если человек выбирает несколько подходов)
// 2) Гуманистический
// 3) Экзистенциальный
// 4) Гештальт
// 5) Когнитивно Поведенческая Терапия
// 6) Психодинамический
// 7) Системный подход
// 8) Рационально - эмотивная терапия
// 9) Позитивная краткосрочная психотерапия
// 10) Нарративная терапия
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
