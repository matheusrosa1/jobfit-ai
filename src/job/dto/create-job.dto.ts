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

  @IsEnum(['on-site', 'remote', 'hybrid'], {
    message: 'The job type should be either on-site, remote, or hybrid.',
  })
  jobType: 'on-site' | 'remote' | 'hybrid';

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
