import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SkillService } from '../src/skill/skill.service';
import { UserSkill } from '../src/user-skill/entities/user-skill.entity';
import { UserSkillService } from '../src/user-skill/user-skill.service';
import { UserService } from '../src/user/user.service';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { INestApplication } from '@nestjs/common';
import { users } from '../mocks/user.mock';
import { skills } from '../mocks/skill.mock';
import { createUserSkillDto, userSkills } from '../mocks/userSkill.mock';


describe('UserSkillService', () => {
  let app: INestApplication;
  let service: UserSkillService;
  let repository: Repository<UserSkill>;
  let skillService: SkillService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSkillService,
        {
          provide: getRepositoryToken(UserSkill),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: SkillService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(() => Promise.resolve('fake-jwt-token')),
            verifyAsync: jest.fn(() => Promise.resolve({ sub: 'user-id', email: 'test@example.com' })),
          },
        },
      ],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({
      canActivate: jest.fn(() => true),
    })
    .compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<UserSkillService>(UserSkillService);
    repository = module.get<Repository<UserSkill>>(getRepositoryToken(UserSkill));
    skillService = module.get<SkillService>(SkillService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(skillService).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should create a UserSkill successfully', async () => {
    jest.spyOn(userService, 'findOne').mockResolvedValue(users[0] as any);
    jest.spyOn(skillService, 'findOne').mockResolvedValue(skills[0] as any);
    jest.spyOn(repository, 'findOne').mockResolvedValue(null); // No existing UserSkill
    jest.spyOn(repository, 'create').mockReturnValue(userSkills[0] as any);
    jest.spyOn(repository, 'save').mockResolvedValue(userSkills[0] as any);

    const result = await service.create(createUserSkillDto);

    expect(result).toEqual(userSkills[0]);
    expect(userService.findOne).toHaveBeenCalledWith(createUserSkillDto.userId);
    expect(skillService.findOne).toHaveBeenCalledWith(createUserSkillDto.skillId);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: {
        user: { id: createUserSkillDto.userId },
        skill: { id: createUserSkillDto.skillId },
      },
    });
    expect(repository.create).toHaveBeenCalledWith({
      user: users[0],
      skill: skills[0],
      yearsOfExperience: createUserSkillDto.yearsOfExperience,
    });
    expect(repository.save).toHaveBeenCalledWith(userSkills[0]);
  });

  afterEach(async () => {
    await app.close();
  });
});
