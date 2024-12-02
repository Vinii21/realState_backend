import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', { unique: true })
  name: string;
  @Column('text', { unique: true })
  email: string;
  @Column('text')
  password: string;
  @Column({ default: true })
  isActive: boolean;
  @Column('text', { array: true, default: ['user'] }) //user - admin
  role: string[];
}
