import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDate,
  IsArray,
  IsUUID,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  location?: string;

  @IsEnum(['on-site', 'remote', 'hybrid'], {
    message: 'The job type should be either on-site, remote, or hybrid.',
  })
  jobType: 'on-site' | 'remote' | 'hybrid';

  @IsString()
  @IsOptional()
  salaryRange?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  postedAt?: Date;

  @IsArray({ message: 'Skills must be an array.' })
  @IsUUID('4', { each: true, message: 'Each skill must be a valid UUID.' })
  @IsOptional()
  skills?: string[];

  @IsInt()
  @Min(0, { message: 'Experience required must be at least 0 years.' })
  experienceRequired: number;
}
