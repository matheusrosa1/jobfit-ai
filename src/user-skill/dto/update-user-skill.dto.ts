import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSkillDto } from './create-user-skill.dto';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSkillDto extends PartialType(CreateUserSkillDto) {
  @ApiProperty({
    description: 'The ID of the user.',
    example: '1',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The ID of the skill.',
    example: '1',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  skillId: string;

  @ApiProperty({
    description: 'The years of experience the user has with the skill.',
    example: 5,
    required: true,
  })
  @IsInt()
  @Min(0)
  yearsOfExperience: number;
}
