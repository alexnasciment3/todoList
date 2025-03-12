import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsNotEmpty()
  @ApiProperty({ example: '12/05/95', default: '12/05/95' })
  birthday: Date;

  @Allow()
  @ApiProperty({ example: 'idFromCollection', default: 'idFromCollection' })
  picture?: string;
}

export class UpdateUserBodyDto {
  @IsOptional()
  @IsString({ always: false })
  @ApiProperty({ example: 'João Paulo', default: 'João Paulo' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'jao@hotmail.com', default: 'jao@hotmail.com' })
  email?: string;

  @IsOptional()
  @IsString({ always: false })
  @ApiProperty({ example: 'jao123', default: 'jao123' })
  nickname?: string;

  @IsOptional()
  @IsString({ always: false })
  @ApiProperty({ example: 'idFromCollection', default: 'idFromCollection' })
  picture?: string;
}

export class WriteoperationDto {
  @ApiProperty({ required: true, default: 'YHBnSIOpZYKmE2iL5C5A' })
  id: string;
}
