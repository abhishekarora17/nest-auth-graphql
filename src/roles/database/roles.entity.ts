import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { RolesEnum } from '../enum/roles.enum';
import { User } from '../../user/database/user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    default: RolesEnum.User
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
