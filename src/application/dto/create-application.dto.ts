import { IsEnum, IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Job } from '../../job/entities/job.entity';

export class CreateApplicationDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  job: Job;

  @IsEnum(['pending', 'in_review', 'approved', 'rejected'], {
    message:
      'The status should be either pending, in_review, approved, or rejected.',
  })
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
}
