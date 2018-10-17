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

@Entity('Expert')
export class Expert {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  userId: string;

  @OneToOne(type => (Expert || Client))
  @JoinColumn()
  user: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  age: string;

  @Column({nullable: true})
  hours: string;

  @OneToMany(type => Cabinet, cabinet => cabinet.owner)
  cabinets: Cabinet[];
}
