import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDate,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    description: 'The title of the job.',
    example: 'Senior Software Engineer',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the job.',
    example: 'We are looking for a Senior Software Engineer to join our team.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The company offering the job.',
    example: 'Google',
  })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({
    description: 'The location of the job.',
    example: 'Mountain View, California',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    description: 'The type of the job (on-site, remote, or hybrid).',
    example: ['on-site', 'remote', 'hybrid'],
    type: 'string',
  })
  @IsEnum(['on-site', 'remote', 'hybrid'], {
    message: 'The job type should be either on-site, remote, or hybrid.',
  })
  jobType: 'on-site' | 'remote' | 'hybrid';

  @ApiProperty({
    description: 'The salary range of the job.',
    example: 'USD 100,000 - 150,000',
    required: false,
  })
  @IsString()
  @IsOptional()
  salaryRange?: string;

  @ApiProperty({
    description: 'The date the job was posted.',
    example: '2021-09-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  postedAt?: Date;

  // alterar experiencia para job-skill
  @IsInt()
  @Min(0, { message: 'Experience required must be at least 0 years.' })
  experienceRequired: number;
}
