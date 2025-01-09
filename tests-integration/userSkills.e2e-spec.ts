import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { UserSkillController } from '../src/user-skill/user-skill.controller';
import { UserSkillService } from '../src/user-skill/user-skill.service';
import { UserService } from '../src/user/user.service';
import { SkillService } from '../src/skill/skill.service';
import { UserSkill } from '../src/user-skill/entities/user-skill.entity';
import { User } from '../src/user/entities/user.entity';
import { Skill } from '../src/skill/entities/skill.entity'; 
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { createUserSkillDto, skillId, userId } from '../mocks/userSkill.mock';

describe('UserSkillsController', () => {
  let controller: UserSkillController;
  let service: UserSkillService;
  let userRepository: Repository<User>;
  let skillRepository: Repository<Skill>; // Referência ao repositório Skill
  let jwtService: JwtService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSkillController],
      providers: [
        UserSkillService,
        UserService,
        SkillService,
        {
          provide: getRepositoryToken(UserSkill),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 'user-id', email: 'test@example.com' }),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Skill), 
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 'skill-id', name: 'JavaScript' }),
            save: jest.fn(),
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

    controller = module.get<UserSkillController>(UserSkillController);
    service = module.get<UserSkillService>(UserSkillService);
    userRepository = module.get(getRepositoryToken(User));  
    skillRepository = module.get(getRepositoryToken(Skill)); 
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should create a user skill association', async () => {
    jest.spyOn(service, 'create').mockResolvedValue({ userId, skillId } as any);

    return request(app.getHttpServer())
      .post('/user-skills')
      .send(createUserSkillDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({ userId, skillId });
      });
  });

  it('should return all user skills', async () => {
    const userSkills = [{ userId: 'user-id', skillId: 'skill-id' }];

    jest.spyOn(service, 'findAll').mockResolvedValue(userSkills as any);

    return request(app.getHttpServer())
      .get('/user-skills')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(userSkills);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
