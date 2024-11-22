import { Job } from 'src/job/entities/job.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job_skills')
export class JobSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job, (job) => job.skills)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => Skill, (skill) => skill.jobs)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;
}
