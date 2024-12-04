import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
  @ApiProperty({
    description: 'The name of the skill.',
    example: 'JavaScript',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
