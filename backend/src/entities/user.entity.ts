import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsISO8601, MinLength, IsAlpha } from 'class-validator';


@Entity() 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  
  @Column()
  @IsNotEmpty({ message: 'Name is reqired' })
  name: string;

  @Column()
  @IsNotEmpty({ message: 'Password is reqired' })
  @MinLength(8)
  password: string; 

  @Column({ default: 'user' }) 
  role: string;

  @Column({ default: 100 })
  points: number

  @Column({ unique: true }) 
  barcode: string;

  @Column({ type: 'date' })
  @IsNotEmpty({ message: 'birthdate is reqired' })
  @IsISO8601()
  birthdate: Date;
}

