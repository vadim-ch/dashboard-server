import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  BeforeUpdate, AfterLoad, JoinColumn,
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
  private tempPassword: string;

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

  @Column({ nullable: true })
  profileId: number;

  @OneToOne(type => Expert || Client)
  @JoinColumn()
  profile: Expert | Client;

  // @OneToOne(type => Client, client => client.user)
  // client: Client;

  @Column({type: 'hstore', nullable: true})
  refreshTokenMap: object;

  @Column({default: false})
  active: boolean;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return await compare(candidatePassword, this.password);
  }

  @BeforeInsert()
  public async preSave() {
    await this.hashPassword();
  }

  @BeforeUpdate()
  public async preUpdate() {
    await this.hashPassword();
  }

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  public async hashPassword() {
    if (this.password && this.tempPassword !== this.password) {
      this.password = await hash(this.password, 12);
    }
  }

  public async isPasswordExist() {
    return Boolean(this.password);
  }
}
