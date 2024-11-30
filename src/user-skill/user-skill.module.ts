import { Module } from '@nestjs/common';
import { UserSkillService } from './user-skill.service';
import { UserSkillController } from './user-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSkill } from './entities/user-skill.entity';
import { UserModule } from 'src/user/user.module';
import { SkillModule } from 'src/skill/skill.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkill]), UserModule, SkillModule],
  controllers: [UserSkillController],
  providers: [UserSkillService],
  exports: [UserSkillService],
})
export class UserSkillModule {}
