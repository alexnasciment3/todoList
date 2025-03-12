import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'datetime' })
  @ApiProperty({ example: '12/05/95', default: '12/05/95' })
  birthday: Date;

  @Column({ type: 'varchar' })
  picture: string;
}
