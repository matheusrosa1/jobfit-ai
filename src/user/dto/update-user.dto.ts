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
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 50, { message: 'A senha deve ter entre 6 e 50 caracteres.' })
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula e um número.',
  })
  password?: string;

  @IsOptional()
  @IsEnum(['candidate', 'recruiter'], {
    message: "O papel deve ser 'candidate' ou 'recruiter'.",
  })
  role?: 'candidate' | 'recruiter';
}
