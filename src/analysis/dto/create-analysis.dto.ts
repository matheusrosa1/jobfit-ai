import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class CreateAnalysisDto {
  @ApiProperty({
    description: 'The ID of the user who requested the analysis.',
    example: 'fcf7c8da-9262-4957-a416-0062d1c1a07e',
  })
  @IsUUID()
  userId: string;
  @ApiProperty({
    description: 'The ID of the job to be analyzed.',
    example: 'a0911f7f-9968-4cc2-b8c8-19f5f4cd0909',
  })
  @IsUUID()
  jobId: string;

  @ApiProperty({
    description: 'The result generated by the AI.',
    example: 'The candidate is a good fit for the job.',
  })
  @Transform(({ value }) => value?.toString())
  geminiAnalysis: string;
}
