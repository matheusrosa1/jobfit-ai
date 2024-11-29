import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateUserSkillDto {
  @ApiProperty({
    description: 'The ID of the user.',
    example: 'fcf7c8da-9262-4957-a416-0062d1c1a07e',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The ID of the skill.',
    example: 'db578fe0-83d3-47c8-835b-d8d900ee45c3',
  })
  @IsUUID()
  @IsNotEmpty()
  skillId: string;

  @ApiProperty({
    description: 'The number of years of experience of the user in the skill.',
    example: 5,
  })
  @IsInt()
  @Min(0)
  yearsOfExperience: number; // Anos de experiência do usuário na habilidade
}
