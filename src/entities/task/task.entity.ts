import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Task {
  @ApiProperty({ example: 'ebacbfdd-c1a5-4fe8-a01e-46dae36b502c' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    required: true,
    example: 'Formatar o PC',
    default: 'Formatar o PC',
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    required: true,
    example: 'Formatar os computadores da lab',
    default: 'Formatar os computadores da lab',
  })
  @Column({ type: 'varchar' })
  description: string;

  @ApiProperty({ required: true, example: false, default: false })
  @Column({ type: 'varchar' })
  isDone: boolean;

  @ApiProperty({ required: false, example: '12/05/25', default: '12/05/25' })
  @Column({ type: 'varchar' })
  limitDateToFinish: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'varchar' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'varchar' })
  updatedAt: Date;
}
