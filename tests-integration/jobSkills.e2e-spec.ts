import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JobSkillController } from "../src/job-skill/job-skill.controller";
import { JobSkillService } from "../src/job-skill/job-skill.service";
import { Job } from "../src/job/entities/job.entity";
import { JobService } from "../src/job/job.service";
import { Skill } from "../src/skill/entities/skill.entity";
import { SkillService } from "../src/skill/skill.service";
import { Repository } from "typeorm";
import { JobSkill } from "../src/job-skill/entities/job-skill.entity";

describe('JobSkillsController', () => {
  let controller: JobSkillController;
  let service: JobSkillService;
  let jobRepository: Repository<Job>;
  let skillRepository: Repository<Skill>;
  let jwtService: JwtService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobSkillController],
      providers: [
        JobSkillService,
        JobService,
        SkillService,
        {
          provide: getRepositoryToken(JobSkill),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
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

    controller = module.get<JobSkillController>(JobSkillController);
    service = module.get<JobSkillService>(JobSkillService);
    jobRepository = module.get(getRepositoryToken(Job));
    skillRepository = module.get(getRepositoryToken(Skill));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });
});