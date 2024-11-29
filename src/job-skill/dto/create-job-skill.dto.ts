import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateJobSkillDto {
  @ApiProperty({
    description: 'The ID of the job.',
    example: 'fcf7c8da-9262-4957-a416-0062d1c1a07e',
  })
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @ApiProperty({
    description: 'The ID of the skill.',
    example: 'db578fe0-83d3-47c8-835b-d8d900ee45c3',
  })
  @IsString()
  @IsNotEmpty()
  skillId: string;
}
