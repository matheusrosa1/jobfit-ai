import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSkillDto } from './create-user-skill.dto';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSkillDto extends PartialType(CreateUserSkillDto) {
  @ApiProperty({
    description: 'The years of experience the user has with the skill.',
    example: 5,
    required: true,
  })
  @IsInt()
  @Min(0)
  yearsOfExperience: number;
}
