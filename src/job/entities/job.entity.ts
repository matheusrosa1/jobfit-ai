import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 100 })
  company: string;

  @Column({ length: 100, nullable: true })
  location: string;

  @Column({
    name: 'job_type',
    type: 'enum',
    enum: ['presencial', 'remoto', 'híbrido'],
    default: 'presencial',
  })
  jobType: 'presencial' | 'remoto' | 'híbrido';

  @Column({ name: 'salary_range', nullable: true })
  salaryRange: string;

  @Column({ nullable: true })
  requirements: string;

  @CreateDateColumn({ name: 'posted_at' })
  postedAt: Date;
}
