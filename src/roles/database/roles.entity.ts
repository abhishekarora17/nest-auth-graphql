import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../user/database/user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
