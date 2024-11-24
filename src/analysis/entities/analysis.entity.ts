import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Job } from 'src/job/entities/job.entity';

@Entity('analysis')
export class Analysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @ManyToOne(() => Job, { nullable: false })
  job: Job;

  @Column('text')
  geminiAnalysis: string; // Resultado gerado pela IA

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
