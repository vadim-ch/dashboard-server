import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum MethodsTherapyEnum {
  SandTherapy ='sand-therapy', // Песочная терапия
  ArtTherapy ='art-therapy', // Арт терапия
  MetaphoricCards ='metaphoric-cards', // Метафорические карты
  Monodrama ='monodrama', // Монодрама
  FairyTaleTherapy ='fairy-tale-therapy', // Сказко-терапия
  BodyorientedTherapy ='bodyoriented-therapy', // Телесно-ориентированная терапия
  DanceTherapy ='danceTherapy', // Танцевальная терапия
  ImageTherapy ='image-therapy', // Работа с образами
  Meditation ='meditation', // Медитация
}

@Entity()
export class MethodsTherapy {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({type: 'enum', enum: MethodsTherapyEnum})
  name: string;

  @Column()
  title: string;
}
