import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'The email of the user.',
    example: 'test@test.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
