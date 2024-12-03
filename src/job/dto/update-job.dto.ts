import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateJobDto {
  @ApiProperty({
    description: 'The title of the job.',
    example: 'Senior Software Engineer',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'The description of the job.',
    example: 'We are looking for a Senior Software Engineer to join our team.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The company offering the job.',
    example: 'Google',
    required: false,
  })
  @IsString()
  @IsOptional()
  company?: string;

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
    required: false,
  })
  @IsEnum(['on-site', 'remote', 'hybrid'], {
    message: 'The job type should be either on-site, remote, or hybrid.',
  })
  @IsOptional()
  jobType?: 'on-site' | 'remote' | 'hybrid';

  @ApiProperty({
    description: 'The salary range of the job.',
    example: 'USD 100,000 - 150,000',
    required: false,
  })
  @IsString()
  @IsOptional()
  salaryRange?: string;

  /*   @ApiProperty({
    description: 'The date the job was posted.',
    example: '2021-08-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  postedAt?: Date; */
}
