import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({
    description: 'The name of the skill.',
    example: 'JavaScript',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
