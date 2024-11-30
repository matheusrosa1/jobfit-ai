import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, IsUUID } from 'class-validator';

export class CreateJobSkillDto {
  @ApiProperty({
    description: 'The ID of the job.',
    example: 'fcf7c8da-9262-4957-a416-0062d1c1a07e',
  })
  @IsUUID()
  @IsNotEmpty()
  jobId: string;

  @ApiProperty({
    description: 'The ID of the skill.',
    example: 'db578fe0-83d3-47c8-835b-d8d900ee45c3',
  })
  @IsUUID()
  @IsNotEmpty()
  skillId: string;

  @ApiProperty({
    description: 'The required experience in years.',
    example: 5,
  })
  @IsInt({
    message: 'The experience required should be an integer.',
  })
  @Min(0, {
    message:
      'The experience required should be an integer, with min value equal to 0.',
  })
  experienceRequired: number;
}
