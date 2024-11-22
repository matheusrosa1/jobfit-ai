import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
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

  @IsOptional()
  @IsArray({ message: 'Skills must be an array.' })
  @IsUUID('4', { each: true, message: 'Each skill must be a valid UUID.' })
  skills?: string[]; // Lista de skills associadas ao usuário, representadas como UUIDs.
}
