import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'varchar',
    length: 14,
    default: null,
  })
  mobileNo: number;

  @Column({
    type: 'timestamp',
    default: null,
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: null,
  })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
