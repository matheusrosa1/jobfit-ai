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
    type: 'enum',
    enum: ['presencial', 'remoto', 'híbrido'],
    default: 'presencial',
  })
  jobType: 'presencial' | 'remoto' | 'híbrido';

  @Column({ nullable: true })
  salaryRange: string;

  @CreateDateColumn({ name: 'posted_at' })
  postedAt: Date;
}
