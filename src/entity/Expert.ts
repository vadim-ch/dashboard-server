import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate, OneToMany
} from 'typeorm';
import {compare, hash} from "bcrypt";
import { Cabinet } from './Cabinet';
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from 'class-validator';

@Entity('Expert')
export class Expert {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Min(0)
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: string;

    @Column({nullable: true})
    addresses: string;

    @Column({nullable: true})
    hours: string;

    @OneToMany(type => Cabinet, cabinet => cabinet.owner)
    cabinets: Cabinet[];

    @Column({nullable: true})
    role: string;

    @Column({type: 'hstore', nullable: true})
    refreshTokenMap: object;

    public async comparePassword (candidatePassword: string): Promise<boolean> {
        return await compare(candidatePassword, this.password);
    }

    @BeforeInsert()
    public async hashPassword() {
        // conditional to detect if password has changed goes here
        this.password = await hash(this.password, 12);
    }
}
