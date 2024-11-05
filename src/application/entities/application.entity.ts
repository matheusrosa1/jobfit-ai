// application.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Job } from '../../job/entities/job.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Job, { eager: true })
  job: Job;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_review', 'approved', 'rejected'],
    default: 'pending',
  })
  status: 'pending' | 'in_review' | 'approved' | 'rejected';

  @CreateDateColumn({ name: 'applied_at' })
  appliedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
