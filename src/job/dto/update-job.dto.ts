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

  @IsEnum(['on-site', 'remote', 'hybrid'], {
    message: 'The job type should be either on-site, remote, or hybrid.',
  })
  @IsOptional()
  jobType?: 'on-site' | 'remote' | 'hybrid';

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
