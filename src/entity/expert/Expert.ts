import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, OneToOne, JoinColumn,
} from 'typeorm';
import { Cabinet } from './Cabinet';
import { Client } from '../client/Client';
import { User } from "../User";

export enum GenderEnum {
  Male = 'male',
  Female = 'female'
}

export enum QualificationEnum {
  Psychologist = 'psychologist', // Психолог
  Psychotherapist = 'psychotherapist', // Психотерапевт
  Psychiatrist = 'psychiatrist', // Психиатр
  Psychoanalyst = 'psychoanalyst' // Психоаналитик
}

@Entity()
export class Expert {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  userId: string;

  @OneToOne(type => User, user => user.expert)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  /**  Персональная информация
   */
  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column({type: 'date', nullable: true})
  birthday: Date;

  @Column({type: 'enum', enum: GenderEnum, nullable: true})
  gender: GenderEnum;

  @Column({nullable: true})
  location: string; // TODO нужен будет json городов россии https://github.com/asakasinsky/russia.json

  /**  Настройки сессий
   * время сессий
   * адреса проведения сессий
   *
   */
  @Column({nullable: true})
  sessionTime: string;

  @Column({nullable: true})
  sessionPrice: string;

  /**  Квалификация
   */
  @Column({type: 'enum', enum: QualificationEnum, array: true, nullable: true})
  qualifications: QualificationEnum[];

  // @Column({nullable: true})
  // education: string[];

  @Column({nullable: true})
  description: string;

  /**  Кабинеты
   */
  @OneToMany(type => Cabinet, cabinet => cabinet.owner)
  cabinets: Cabinet[];
}
