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
  @ApiProperty({ example: 'ebacbfdd-c1a5-4fe8-a01e-46dae36b502c' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: true, example: 'Alexsander', default: 'Alexsander' })
  @Column({ type: 'varchar', length: 60 })
  name: string;

  @ApiProperty({
    required: true,
    example: 'alex@email.com',
    default: 'alex@email.com',
  })
  @Column({ type: 'varchar', length: 100 })
  email: string;

  //TODO: Ajeitar essa data
  @ApiProperty({ required: false, example: '12/05/95', default: '12/05/95' })
  @Column({ type: 'varchar', nullable: true })
  birthday: Date;

  @ApiProperty({ required: true, example: '123123', default: '123123' })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({
    required: false,
    example: 'ImageUrl.com',
    default: 'ImageUrl.com',
  })
  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @ApiProperty({ example: '12/05/95', default: '12/05/95' })
  @CreateDateColumn({ type: 'varchar' })
  createdAt: Date;

  @ApiProperty({ example: '12/05/95', default: '12/05/95' })
  @UpdateDateColumn({ type: 'varchar' })
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
