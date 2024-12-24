import { ConflictException, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Skill } from "../src/skill/entities/skill.entity";
import { SkillController } from "../src/skill/skill.controller";
import { SkillService } from "../src/skill/skill.service";
import { Repository } from "typeorm";
import * as request from 'supertest';

describe('SkillController (Integration)', () => {
  let app: INestApplication;
  let service: SkillService;
  let repository: Repository<Skill>;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [
        SkillService,
        {
          provide: getRepositoryToken(Skill),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
            clear: jest.fn(),
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

    service = module.get<SkillService>(SkillService);
    repository = module.get<Repository<Skill>>(getRepositoryToken(Skill));
    jwtService = module.get<JwtService>(JwtService);


  });

  it('deve criar uma skill', async () => {
    const createSkillDto = {
      name: 'Test Skill',
    };

    jest.spyOn(service, 'create').mockResolvedValue(createSkillDto as any);

    return request(app.getHttpServer())
      .post('/skills')
      .send(createSkillDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(createSkillDto);
      });

  });
  it('deve retornar todas as skills', async () => {
    const skills = [{
      id: '1',
      name: 'Test Skill',
    }]
    jest.spyOn(service, 'findAll').mockResolvedValue(skills as any);

    return request(app.getHttpServer())
      .get('/skills')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(skills);
      });
  })
    afterAll(async () => {
      await app.close();
    });
});
  