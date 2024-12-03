import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSkillDto } from './create-job-skill.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobSkillDto extends PartialType(CreateJobSkillDto) {
  @ApiProperty({
    description: 'The ID of the job.',
    example: '1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @ApiProperty({
    description: 'The ID of the skill.',
    example: '1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  skillId: string;
}
