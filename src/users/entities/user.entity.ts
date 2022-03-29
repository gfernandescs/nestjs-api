import {
  Entity,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { userRoles } from '../constants';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @Column({ primary: true, generated: 'uuid' })
  id: number;

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

  @Column()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
