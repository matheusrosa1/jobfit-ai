import { IsEnum, IsOptional } from 'class-validator';

export class UpdateApplicationDto {
  @IsEnum(['pending', 'in_review', 'approved', 'rejected'], {
    message:
      'The status should be either pending, in_review, approved, or rejected.',
  })
  @IsOptional()
  status?: 'pending' | 'in_review' | 'approved' | 'rejected';
}
