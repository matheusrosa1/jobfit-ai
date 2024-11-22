import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
  @IsString()
  @IsNotEmpty()
  name: string;
}
