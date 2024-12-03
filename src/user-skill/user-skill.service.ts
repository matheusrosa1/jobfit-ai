import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSkill } from './entities/user-skill.entity';
import { SkillService } from 'src/skill/skill.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserSkillService {
  constructor(
    @InjectRepository(UserSkill)
    private userSkillRepository: Repository<UserSkill>,
    private skillService: SkillService,
    private userService: UserService,
  ) {}

  async checkUserSkillExists(userId: string, skillId: string) {
    const existingUserSkill = await this.userSkillRepository.findOne({
      where: {
        user: { id: userId },
        skill: { id: skillId },
      },
    });

    return existingUserSkill !== null;
  }

  async create(createUserSkillDto: CreateUserSkillDto) {
    const { userId, skillId, yearsOfExperience } = createUserSkillDto;

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const skill = await this.skillService.findOne(skillId);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${skillId} not found`);
    }

    const userSkillExists = await this.checkUserSkillExists(userId, skillId);
    if (userSkillExists) {
      throw new BadRequestException(
        `UserSkill with User ID ${userId} and Skill ID ${skillId} already exists`,
      );
    }

    const userSkill = this.userSkillRepository.create({
      user,
      skill,
      yearsOfExperience,
    });

    return this.userSkillRepository.save(userSkill);
  }

  async findAll() {
    return this.userSkillRepository.find({ relations: ['user', 'skill'] });
  }

  async findSkillsByUserId(
    userId: string,
  ): Promise<{ name: string; yearsOfExperience: number }[]> {
    const userSkills = await this.userSkillRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'skill'],
    });

    if (!userSkills || userSkills.length === 0) {
      throw new NotFoundException(`No skills found for User with ID ${userId}`);
    }

    return userSkills.map((userSkill) => ({
      name: userSkill.skill.name,
      yearsOfExperience: userSkill.yearsOfExperience,
    }));
  }

  async findOne(id: string) {
    const userSkill = await this.userSkillRepository.findOne({
      where: { id },
      relations: ['user', 'skill'],
    });

    if (!userSkill) {
      throw new NotFoundException(`UserSkill with ID ${id} not found`);
    }

    return userSkill;
  }

  async update(id: string, updateUserSkillDto: UpdateUserSkillDto) {
    const userSkill = await this.userSkillRepository.findOne({ where: { id } });

    if (!userSkill) {
      throw new NotFoundException(`UserSkill with ID ${id} not found`);
    }

    if (updateUserSkillDto.userId) {
      const user = await this.userService.findOne(updateUserSkillDto.userId);
      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateUserSkillDto.userId} not found`,
        );
      }
      userSkill.user = user;
    }

    if (updateUserSkillDto.skillId) {
      const skill = await this.skillService.findOne(updateUserSkillDto.skillId);
      if (!skill) {
        throw new NotFoundException(
          `Skill with ID ${updateUserSkillDto.skillId} not found`,
        );
      }
      userSkill.skill = skill;
    }

    if (updateUserSkillDto.yearsOfExperience !== undefined) {
      userSkill.yearsOfExperience = updateUserSkillDto.yearsOfExperience;
    }

    return this.userSkillRepository.save(userSkill);
  }

  async remove(id: string) {
    const result = await this.userSkillRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`UserSkill with ID ${id} not found`);
    }
  }
}
