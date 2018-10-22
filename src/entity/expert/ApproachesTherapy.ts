import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ApproachesTherapyEnum {

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
