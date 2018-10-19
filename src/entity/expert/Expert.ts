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

export enum SessionFormatEnum {
  Meeting = 'meeting', // Очная встреча
  Video = 'video', // Видео связь
  Audio = 'audio', // Аудио связь
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

  /** ----------------- Персональная информация -----------------
   * Имя
   */
  @Column()
  firstName: string;

  /**
   * Отчество
   */
  @Column()
  middleName: string;

  /**
   * Фамилия
   */
  @Column()
  lastName: string;

  /**
   * Обо мне
   */
  @Column({nullable: true})
  description: string;

  /**
   * Дата рождения
   */
  @Column({type: 'date', nullable: true})
  birthday: Date;

  /**
   * Пол
   */
  @Column({type: 'enum', enum: GenderEnum, nullable: true})
  gender: GenderEnum;

  /**
   * Город
   */
  @Column({nullable: true})
  location: string; // TODO нужен будет json городов россии https://github.com/asakasinsky/russia.json

  /** ----------------- Настройки сессий -----------------
   * Время сессий
   */
  @Column({nullable: true})
  sessionTime: string;

  /**
   * Цена за час консультаций
   */
  @Column({nullable: true})
  sessionPrice: string;

  /**
   * Форматы консультаций
   */
  @Column({type: 'enum', enum: SessionFormatEnum, array: true, nullable: true})
  sessionFormat: SessionFormatEnum[];

  /**
   * Адреса проведения консультаций
   */
  // @Column({nullable: true})
  // sessionAddresses: string;

  /** ----------------- Компетенции -----------------
   * Квалификация
   */
  @Column({type: 'enum', enum: QualificationEnum, array: true, nullable: true})
  qualifications: QualificationEnum[];

  /**
   * Образование
   */
  // @Column({nullable: true})
  // education: string[];


  /**
   * Часы личной терапии
   */

  /**
   * Запросы с которыми работаю
   */

  /**
   * Направление работы
   * индивидуальные/семейные/групповые
   */

  /**
   * Методика работы
   * Арт/телесно...
   */

  /**
   * Запросы с которыми работаю
   * тревога/кризис/одиночество
   */

  /**
   * Кабинеты
   */
  @OneToMany(type => Cabinet, cabinet => cabinet.owner)
  cabinets: Cabinet[];
}
