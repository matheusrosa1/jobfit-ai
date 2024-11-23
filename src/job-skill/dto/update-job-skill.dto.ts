import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSkillDto } from './create-job-skill.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateJobSkillDto extends PartialType(CreateJobSkillDto) {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsString()
  @IsNotEmpty()
  skillId: string;
}
