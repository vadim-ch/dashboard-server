import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, OneToOne, JoinColumn, ManyToOne,
} from 'typeorm';
import { Expert } from './Expert';

@Entity()
export class Cabinet {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(type => Expert, expert => expert.cabinets, {cascade: true})
  owner: Expert;

  @Column()
  address: string;

  @Column()
  availableHours: string;
}
