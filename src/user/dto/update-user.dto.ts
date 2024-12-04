import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 100, {
    message: 'The name must be between 3 and 100 characters long.',
  })
  name?: string;

  @ApiProperty({
    description: 'The email of the user.',
    example: 'test@test.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'The email address provided is invalid.' })
  email?: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'Password1',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(6, 50, {
    message: 'The password must be between 6 and 50 characters long.',
  })
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'The password must contain at least one uppercase letter and one number.',
  })
  password?: string;

  @ApiProperty({
    description: 'The role of the user.',
    example: 'candidate',
    required: false,
  })
  @IsEnum(['candidate', 'recruiter'], {
    message: "The role should be 'candidate' or 'recruiter'.",
  })
  role?: 'candidate' | 'recruiter';
}
