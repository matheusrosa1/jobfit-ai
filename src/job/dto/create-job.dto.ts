import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDate,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsEnum(['presencial', 'remoto', 'híbrido'])
  jobType: 'presencial' | 'remoto' | 'híbrido';

  @IsString()
  @IsOptional()
  salaryRange: string;

  @IsString()
  @IsOptional()
  requirements: string;

  @IsDate()
  @IsOptional()
  postedAt?: Date;
}
