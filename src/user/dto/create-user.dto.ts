import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'The name cannot be empty.' })
  @IsString({ message: 'The name must be a string.' })
  name: string;

  @ApiProperty({
    description: 'The email of the user.',
    example: 'email@example.com',
  })
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'password',
  })
  @IsNotEmpty({ message: 'The password cannot be empty.' })
  @MinLength(6, { message: 'The password must be at least 6 characters long.' })
  password: string;

  @ApiProperty({
    description: "The user's role.",
    example: ['candidate', 'recruiter'],
  })
  @IsEnum(['candidate', 'recruiter'], {
    message: "The role should be 'candidate' or 'recruiter'.",
  })
  role?: 'candidate' | 'recruiter';
}
