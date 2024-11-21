import { IsString, IsOptional, IsEnum, IsDate } from 'class-validator';

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(['presencial', 'remoto', 'híbrido'])
  @IsOptional()
  jobType?: 'presencial' | 'remoto' | 'híbrido';

  @IsString()
  @IsOptional()
  salaryRange?: string;

  @IsString()
  @IsOptional()
  requirements?: string;

  @IsDate()
  @IsOptional()
  postedAt?: Date;
}
