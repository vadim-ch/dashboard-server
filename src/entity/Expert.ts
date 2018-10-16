import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate
} from 'typeorm';
import {compare, hash} from "bcrypt";

@Entity('Expert')
export class Expert {

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

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: string;

    @Column({
        nullable: true
    })
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
