import { Module } from '@nestjs/common';
import { JobSkillService } from './job-skill.service';
import { JobSkillController } from './job-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSkill } from './entities/job-skill.entity';
import { SkillModule } from '../../src/skill/skill.module';
import { JobModule } from '../../src/job/job.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobSkill]), JobModule, SkillModule],
  controllers: [JobSkillController],
  providers: [JobSkillService],
  exports: [JobSkillService],
})
export class JobSkillModule {}
