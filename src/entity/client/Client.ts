import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../User';

@Entity()
export class Client {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  userId: string;

  // @OneToOne(type => User, user => user.profile)
  // user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({nullable: true})
  age: string;
}
