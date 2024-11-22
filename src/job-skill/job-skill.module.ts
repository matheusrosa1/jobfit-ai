import { Module } from '@nestjs/common';
import { JobSkillService } from './job-skill.service';
import { JobSkillController } from './job-skill.controller';

@Module({
  controllers: [JobSkillController],
  providers: [JobSkillService],
})
export class JobSkillModule {}
