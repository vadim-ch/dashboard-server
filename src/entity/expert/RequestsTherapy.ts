import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RequestsTherapyEnum {

}

@Entity()
export class RequestsTherapy {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({type: 'enum', enum: RequestsTherapyEnum})
  name: string;

  @Column()
  title: string;

  @Column({nullable: true})
  description: string;
}
