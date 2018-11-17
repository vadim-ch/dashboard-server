import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  BeforeUpdate,
} from 'typeorm';
import { compare, hash } from 'bcrypt';
import { Client } from './client/Client';
import {Expert} from './expert/Expert';

export enum UserRole {
  Client = 'client',
  Expert = 'expert',
  Admin = 'admin'
}

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  email: string;

  @Column({nullable: true})
  password: string;

  @Column({type: 'enum', enum: UserRole})
  role: UserRole;

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
  public async preSave() {
    console.error('preSave');
    await this.hashPassword();
  }

  @BeforeUpdate()
  public async preUpdate() {
    console.error('preUpdate');
    await this.hashPassword();
  }

  public async hashPassword() {
    // conditional to detect if password has changed goes here
    if (this.password) {
      this.password = await hash(this.password, 12);
    }
  }
}
