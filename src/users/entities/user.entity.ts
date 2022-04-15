import { Entity, Column, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { userRoles } from '../constants';
import { BaseEntity } from '../../common/bases/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  roles: userRoles;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
