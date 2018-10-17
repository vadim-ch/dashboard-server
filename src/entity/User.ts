import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert, OneToOne, JoinColumn,
} from 'typeorm';
import { compare, hash } from 'bcrypt';
import { Client } from './client/Client';
import { Expert } from './expert/Expert';
import { UserType } from '../store/user';

@Entity('User')
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({enum: ['expert', 'client']})
  role: string;

  @OneToOne(type => Expert, expert => expert.user)
  expert: Expert;

  @OneToOne(type => Client, client => client.user)
  client: Client;

  @Column({type: 'hstore', nullable: true})
  refreshTokenMap: object;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return await compare(candidatePassword, this.password);
  }

  @BeforeInsert()
  public async hashPassword() {
    // conditional to detect if password has changed goes here
    this.password = await hash(this.password, 12);
  }
}
