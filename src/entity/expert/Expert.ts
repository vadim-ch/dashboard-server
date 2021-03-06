import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable,
} from 'typeorm';
import {Cabinet} from './Cabinet';
import {Client} from '../client/Client';
import {User} from "../User";
import {MethodsTherapy} from "./MethodsTherapy";
import {RequestsTherapy} from "./RequestsTherapy";
import {ApproachesTherapy} from "./ApproachesTherapy";

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

export enum DirectionsTherapyEnum {
  FamilyTherapy = 'family-therapy', // Семейная терапия
  IndividualTherapy = 'individual-therapy', // Индивидуальная терапия
  GroupTherapy = 'group-therapy', // Групповая терапия
}

@Entity()
export class Expert {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  userId: string;

  // @OneToOne(type => User, user => user.profile)
  // user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  /** ----------------- Персональная информация -----------------
   * Имя
   */
  @Column({nullable: true})
  firstName: string;

  /**
   * Отчество
   */
  @Column({nullable: true})
  middleName: string;

  /**
   * Фамилия
   */
  @Column({nullable: true})
  lastName: string;

  /**
   * Аватар
   */
  @Column({nullable: true})
  avatar: string;

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
  @Column({nullable: true})
  ownTherapyHours: number;

  /**
   * Направление работы
   * индивидуальные/семейные/групповые
   */
  @Column({type: 'enum', enum: DirectionsTherapyEnum, array: true, nullable: true})
  directionsTherapy: DirectionsTherapyEnum[];

  /**
   * Подходы
   */
  @ManyToMany(type => ApproachesTherapy, method => method.id, {cascade: true})
  @JoinTable()
  approachesTherapy: ApproachesTherapy[];

  /**
   * Дополнительные методы
   * Арт/телесно...
   */
  @ManyToMany(type => MethodsTherapy, method => method.id, {cascade: true})
  @JoinTable()
  methodsTherapy: MethodsTherapy[];


  /**
   * Приоритетные запросы
   * тревога/кризис/одиночество
   */
  @ManyToMany(type => RequestsTherapy, method => method.id, {cascade: true})
  @JoinTable()
  requestsTherapy: RequestsTherapy[];

  /**
   * Кабинеты
   */
  @OneToMany(type => Cabinet, cabinet => cabinet.owner)
  cabinets: Cabinet[];
}
