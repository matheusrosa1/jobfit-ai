import { Job } from '../../../src/job/entities/job.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string; // Nome da habilidade (ex: "JavaScript", "React", etc.)

  @ManyToMany(() => Job, (job) => job.skills)
  jobs: Job[];
}
