import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateApplicationDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string; // Apenas o ID do usuário

  @IsUUID()
  @IsNotEmpty()
  jobId: string; // Apenas o ID do job

  @IsEnum(['pending', 'in_review', 'approved', 'rejected'], {
    message:
      'The status should be either pending, in_review, approved, or rejected.',
  })
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
}
