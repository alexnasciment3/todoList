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
  @ApiProperty({ required: true, example: 'João Paulo', default: 'João Paulo' })
  name: string;

  @IsEmail()
  @ApiProperty({
    required: true,
    example: 'jao@hotmail.com',
    default: 'jao@hotmail.com',
  })
  email: string;

  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    const fullYear = `20${year.length === 2 ? year : year}`;
    return new Date(`${fullYear}-${month}-${day}`);
  })
  @IsDate({ message: 'Birthday must be a valid date (DD/MM/YY)' })
  @ApiProperty({ required: false, example: '12/05/95', default: '12/05/95' })
  birthday: Date;

  @IsString()
  @ApiProperty({ required: true, example: '123123a', default: '123123a' })
  password;

  @Allow()
  @ApiProperty({
    required: false,
    example: 'idFromCollection',
    default: 'idFromCollection',
  })
  picture: string;
}

export class GetUserOperationDto {
  @ApiProperty({
    required: true,
    default: '24e3ce30-c7fb-42c0-84d2-6fdfbc1ecd93',
  })
  id: string;
}

export class UpdateUserBodyDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty({ required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  picture?: string;

  @IsOptional()
  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    return new Date(`${day}-${month}-${year}`);
  })
  @IsDate({ message: 'Birthday must be a valid date (DD/MM/YY)' })
  @ApiProperty({ required: false })
  birthday?: Date;
}
