import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { Application } from './entities/application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { JobModule } from 'src/job/job.module';

@Module({
  imports: [UserModule, JobModule, TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
