import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Expert')
export class Expert {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: string;
}
