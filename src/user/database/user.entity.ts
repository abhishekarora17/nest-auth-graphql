import { Roles } from '../../roles/database/roles.entity';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, JoinColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Roles, (role) => role.users)
  role: Roles;

  @Column({
     nullable: true,
     type: 'varchar', 
  })
  refreshToken?: string;

  @Column({
     nullable: true,
     type: 'varchar', 
  })
  accessToken?: string;

  @Column({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
