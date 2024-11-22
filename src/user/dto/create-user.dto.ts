import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'The name cannot be empty.' })
  @IsString({ message: 'The name must be a string.' })
  name: string;

  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'The password cannot be empty.' })
  @MinLength(6, { message: 'The password must be at least 6 characters long.' })
  password: string;

  @IsEnum(['candidate', 'recruiter'], {
    message: "The role should be 'candidate' or 'recruiter'.",
  })
  role?: 'candidate' | 'recruiter';
}
