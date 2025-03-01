import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
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
     nullable: true,
     type: 'varchar', 
  })
  refreshToken?: string;

  @Column({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
