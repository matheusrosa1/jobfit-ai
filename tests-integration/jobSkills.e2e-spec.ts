import { BadRequestException, INestApplication } from "@nestjs/common";
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
import { createJobSkillDto, jobId, jobSkills, skillId, updateJobSkillDto } from "../mocks/jobSkill.mock";
import * as request from 'supertest';

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

  it('should create a job skill association', async () => {
    jest.spyOn(service, 'create').mockResolvedValue({ jobId, skillId } as any);

    return request(app.getHttpServer())
      .post('/job-skills')
      .send(createJobSkillDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('jobId', jobId);
        expect(res.body).toHaveProperty('skillId', skillId);
      });
  });

  it('should return all job skills', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(jobSkills as any);

      return request(app.getHttpServer())
        .get('/job-skills')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(jobSkills)
      });
  });

  it('should return a job skill by ID', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(jobSkills[0] as any);

    return request(app.getHttpServer())
      .get(`/job-skills/${jobSkills[0].id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(jobSkills[0]);
      });
  });

  it('should delete a job skill by ID', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(jobSkills[0] as any);

    return request(app.getHttpServer())
      .delete(`/job-skills/${jobSkills[0].id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(jobSkills[0]);
      });
  });

  it('should update a job skill by ID', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(jobSkills[0] as any);

    return request(app.getHttpServer())
      .patch(`/job-skills/${jobSkills[0].id}`)
      .send(updateJobSkillDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(jobSkills[0]);
      });
  });

  it('should throw BadRequestException when creating a job skill association that already exists', async () => {
    jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

    return request(app.getHttpServer())
      .post('/job-skills')
      .send(createJobSkillDto)
      .expect(400);
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });
});