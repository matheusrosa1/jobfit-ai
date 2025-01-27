import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis } from './entities/analysis.entity';
import { GeminiService } from '../../src/gemini/gemini.service';
import { UserSkillModule } from '../../src/user-skill/user-skill.module';
import { JobSkillModule } from '../../src/job-skill/job-skill.module';
import { UserModule } from '../../src/user/user.module';
import { JobModule } from '../../src/job/job.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Analysis]),
    UserModule,
    JobModule,
    UserSkillModule,
    JobSkillModule,
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService, GeminiService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
