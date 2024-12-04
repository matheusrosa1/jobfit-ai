import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSkillDto } from './create-job-skill.dto';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UpdateJobSkillDto extends PartialType(CreateJobSkillDto) {
  @Exclude()
  @ApiProperty({
    description: 'The ID of the job (read-only). It cannot be updated.',
    example: '295831db-5d2b-4e61-a108-cb362ab1d36d',
    readOnly: true,
  })
  jobId: string;

  @Exclude()
  @ApiProperty({
    description: 'The ID of the skill (read-only). It cannot be updated.',
    example: '641ee8ee-9f27-4412-8870-6fc1770f08b9',
    readOnly: true,
  })
  skillId: string;

  @ApiProperty({
    description: 'Years of experience required for the skill.',
    example: 3,
  })
  @IsInt()
  @Min(0)
  experienceRequired: number;
}
