import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSkillDto } from './create-user-skill.dto';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class UpdateUserSkillDto extends PartialType(CreateUserSkillDto) {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  skillId: string;

  @IsInt()
  @Min(0)
  yearsOfExperience: number; // Anos de experiência do usuário na habilidade
}
