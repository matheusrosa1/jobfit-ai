import { IsString, IsNotEmpty } from 'class-validator';

export class CreateJobSkillDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsString()
  @IsNotEmpty()
  skillId: string;
}
