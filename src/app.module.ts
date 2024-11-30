import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { GeminiService } from './gemini/gemini.service';
import { SkillModule } from './skill/skill.module';
import { UserSkillModule } from './user-skill/user-skill.module';
import { JobSkillModule } from './job-skill/job-skill.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local', '.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      migrationsRun: true,
    }),
    UserModule,
    JobModule,
    SkillModule,
    UserSkillModule,
    JobSkillModule,
    AnalysisModule,
  ],
  providers: [GeminiService],
})
export class AppModule {}
