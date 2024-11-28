import { IsUUID } from 'class-validator';

export class CreateAnalysisDto {
  @IsUUID() // Garantir que seja um UUID válido
  userId: string;

  @IsUUID() // Garantir que seja um UUID válido
  jobId: string;
}
