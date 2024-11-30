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

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @Length(3, 100, {
    message: 'The name must be between 3 and 100 characters long.',
  })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'The email address provided is invalid.' })
  email?: string;

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

  @IsEnum(['candidate', 'recruiter'], {
    message: "The role should be 'candidate' or 'recruiter'.",
  })
  role?: 'candidate' | 'recruiter';
}