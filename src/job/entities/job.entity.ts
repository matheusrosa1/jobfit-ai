import { Skill } from 'src/skill/entities/skill.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
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
    enum: ['on-site', 'remote', 'hybrid'],
    default: 'on-site',
  })
  jobType: 'on-site' | 'remote' | 'hybrid';

  @Column({ name: 'salary_range', nullable: true })
  salaryRange: string;

  @CreateDateColumn({ name: 'posted_at' })
  postedAt: Date;

  @ManyToMany(() => Skill)
  @JoinTable({
    name: 'job_skills',
    joinColumn: { name: 'job_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
  })
  skills: Skill[];
}
