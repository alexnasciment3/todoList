import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Allow, IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: '12/05/95', default: '12/05/95' })
  birthday: Date;

  @ApiProperty({ example: 'João Paulo', default: 'João Paulo' })
  name: string;

  @ApiProperty({ example: 'jao@hotmail.com', default: 'jao@hotmail.com' })
  email: string;

  @ApiProperty({ example: 'idFromCollection', default: 'idFromCollection' })
  picture?: string;
}

export class CreateUserBodyDto {
  @IsString()
  @ApiProperty({ example: 'João Paulo', default: 'João Paulo' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'jao@hotmail.com', default: 'jao@hotmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'jao123', default: 'jao123' })
  nickname: string;

  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    const fullYear = `20${year.length === 2 ? year : year}`;
    return new Date(`${fullYear}-${month}-${day}`);
  })
  @IsDate({ message: 'Birthday must be a valid date (DD/MM/YY)' })
  @ApiProperty({ example: '12/05/95', default: '12/05/95' })
  birthday: Date;

  @Allow()
  @ApiProperty({ example: 'idFromCollection', default: 'idFromCollection' })
  picture?: string;
}

export class WriteoperationDto {
  @ApiProperty({ required: true, default: 'YHBnSIOpZYKmE2iL5C5A' })
  id: string;
}

export class UpdateUserBodyDto {
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
