import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillModule } from '../../src/skill/skill.module';
import { Skill } from '../../src/skill/entities/skill.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, Skill]), SkillModule],
  exports: [UserService],
})
export class UserModule {}
