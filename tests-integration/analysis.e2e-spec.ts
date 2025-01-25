import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AnalysisController } from "../src/analysis/analysis.controller";
import { AnalysisService } from "../src/analysis/analysis.service";
import { JobSkill } from "../src/job-skill/entities/job-skill.entity";
import { JobSkillService } from "../src/job-skill/job-skill.service";
import { Job } from "../src/job/entities/job.entity";
import { JobService } from "../src/job/job.service";
import { UserSkill } from "../src/user-skill/entities/user-skill.entity";
import { UserSkillService } from "../src/user-skill/user-skill.service";
import { User } from "../src/user/entities/user.entity";
import { UserService } from "../src/user/user.service";
import { Repository } from "typeorm";
import { AnalysisModule } from "../src/analysis/analysis.module";

describe('AnalysisController', () => {
  let controller: AnalysisController;
  let service: AnalysisService;
  let userRepository: Repository<User>;
  let jobRepository: Repository<Job>;
  let jobSkillRepository: Repository<JobSkill>;
  let userSkillRepository: Repository<UserSkill>;
  let jwtService: JwtService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalysisController],
      providers: [
        AnalysisService,
        UserService,
        JobService,
        JobSkillService,
        UserSkillService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 'user-id', email: 'test@example.com' }),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Job),
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 'job-id', title: 'Software Engineer' }),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(JobSkill),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserSkill),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AnalysisModule),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
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

    controller = module.get<AnalysisController>(AnalysisController);
    service = module.get<AnalysisService>(AnalysisService);
    userRepository = module.get(getRepositoryToken(User));
    jobRepository = module.get(getRepositoryToken(Job));
    jobSkillRepository = module.get(getRepositoryToken(JobSkill));
    userSkillRepository = module.get(getRepositoryToken(UserSkill));
    jwtService = module.get<JwtService>(JwtService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });

});