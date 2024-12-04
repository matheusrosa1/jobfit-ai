import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSkillDto } from './create-job-skill.dto';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobSkillDto extends PartialType(CreateJobSkillDto) {
  @ApiProperty({
    description: 'Years of experience required for the skill.',
    example: 3,
    required: true,
  })
  @IsInt()
  @Min(0)
  experienceRequired: number;
}
