import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as request from 'supertest'; // Usando supertest para testar a API
import { INestApplication } from '@nestjs/common';
import { UserService } from '../src/user/user.service';
import { User } from '../src/user/entities/user.entity';
import { UserController } from '../src/user/user.controller';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../src/auth/jwt.strategy';

describe('UserController (Integration)', () => {
  let app: INestApplication; // Alterando para usar a aplicação como parâmetro
  let service: UserService;
  let repository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
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
          provide: JwtStrategy, // Mockando a estratégia JWT
          useValue: {
            validate: jest.fn().mockResolvedValue({ id: 'some-uuid', email: 'test@example.com' }), // Mocka o método de validação
          },
        },
        {
          provide: AuthGuard('jwt'), // Mockando o AuthGuard
          useValue: {
            canActivate: jest.fn(() => true), // Sempre retorna true, como se o JWT fosse válido
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('deve criar um usuário', async () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'candidate',
    };

    jest.spyOn(service, 'create').mockResolvedValue(createUserDto as any); // Mock do service

    return request(app.getHttpServer()) // Usando a instância da aplicação aqui
      .post('/users')
      .send(createUserDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          ...createUserDto,
          password: expect.any(String), // Verifica que a senha está sendo retornada, mas não é a original
        });
      });
  });

  it('deve remover um usuário', async () => {
    const id = 'some-uuid';
    jest.spyOn(service, 'remove').mockResolvedValueOnce({ affected: 1 } as any);

    return request(app.getHttpServer()) // Usando a instância da aplicação aqui
      .delete(`/users/${id}`)
      .set('Authorization', 'Bearer fake-jwt-token') // Passando um token JWT falso
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ affected: 1 });
      });
  });

  afterAll(async () => {
    // Limpeza após os testes, se necessário
    await app.close();
  });
});
