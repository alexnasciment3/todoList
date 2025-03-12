import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  //TODO: Ajeitar essa data
  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ example: '12/05/95', default: '12/05/95' })
  birthday: Date;

  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @CreateDateColumn({ type: 'varchar' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'varchar' })
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
