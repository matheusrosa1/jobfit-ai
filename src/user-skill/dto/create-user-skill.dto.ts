import { IsUUID, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateUserSkillDto {
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
