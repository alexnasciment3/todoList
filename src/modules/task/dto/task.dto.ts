import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskBodyDto {
  @IsString()
  @ApiProperty({ example: 'Limpeza', required: true, default: 'Limpeza' })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Limpar os comodos da casa',
    default: 'Limpar os comodos da casa',
  })
  description: string;

  @ApiProperty({
    required: true,
    example: '24e3ce30-c7fb-42c0-84d2-6fdfbc1ecd93',
    default: '24e3ce30-c7fb-42c0-84d2-6fdfbc1ecd93',
  })
  @IsString()
  userId: string;

  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    const fullYear = `20${year.length === 2 ? year : year}`;
    return new Date(`${day}-${month}-${fullYear}`);
  })
  @IsDate({ message: 'Limit date must be in format (DD/MM/YY)' })
  @ApiProperty({ required: false, example: '12/05/25', default: '12/05/25' })
  limitDateToFinish: Date;

  @IsBoolean()
  @ApiProperty({
    example: false,
    default: false,
    required: true,
  })
  isDone: boolean;
}

export class UpdateTaskBodyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    return new Date(`${day}-${month}-${year}`);
  })
  @IsDate({ message: 'Birthday must be a valid date (DD/MM/YY)' })
  birthday?: Date;
}

export class GeTaskOperationDto {
  @ApiProperty({
    required: true,
    default: '24e3ce30-c7fb-42c0-84d2-6fdfbc1ecd93',
  })
  id: string;
}
