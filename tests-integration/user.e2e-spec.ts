import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'supertest'; // Usando supertest para testar a API
import { BadRequestException, INestApplication } from '@nestjs/common';
import { UserService } from '../src/user/user.service';
import { User } from '../src/user/entities/user.entity';
import { UserController } from '../src/user/user.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { createUserDto, id, updateUserDto, user, users } from '../mocks/user.mock';

describe('UserController (Integration)', () => {
  let app: INestApplication;
  let service: UserService;
  let repository: Repository<User>;
  let jwtService: JwtService;

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

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve criar um usuário', async () => {
    

    jest.spyOn(service, 'create').mockResolvedValue(createUserDto as any); // Mock do service

    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          ...createUserDto,
        });
      });
  });

  it('deve retornar erro 400 se o email já estiver em uso', async () => {
    // Simulando o lançamento da exceção BadRequestException no serviço
    jest.spyOn(service, 'create').mockRejectedValueOnce(new BadRequestException('User with email test@example.com already exists'));
  
    return request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({
          statusCode: 400,
          message: 'User with email test@example.com already exists',
          error: 'Bad Request',
        });
      });
  });
  

  it('deve retornar todos os usuários', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(users as any);

    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(users);
      });

  });

  it('deve retornar um usuário', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(user as any);

    return request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .set('Authorization', 'Bearer fake-jwt-token')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(user);
      });

  });

  it('deve retornar um erro 404 se o usuário não for encontrado', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(null);

    return request(app.getHttpServer())
      .get(`/users/${id}`)
      .set('Authorization', 'Bearer fake-jwt-token')
      .expect(404)
      .expect((res) => {
        expect(res.body).toEqual({
          statusCode: 404,
          message: `User with ID ${id} not found`,
          error: 'Not Found',
        });
      });

  });

  it('deve atualizar um usuário', async () => {
    const id = 'some-uuid';
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'candidate',
    };
    // Mock da criação do usuário - simula a criação de um usuário no banco de dados
    jest.spyOn(service, 'create').mockResolvedValueOnce({
      ...createUserDto,
      id, // Atribuindo um id ao usuário recém-criado
    } as any);
  
    // Mock do método 'update' do service - simula que o usuário foi atualizado
    jest.spyOn(service, 'update').mockResolvedValueOnce({
      ...updateUserDto,
      id,
    } as any);
  
    // Criando o usuário antes de tentar a atualização
    await request(app.getHttpServer())
      .post('/users') // Criando o usuário
      .send(createUserDto)
      .set('Authorization', 'Bearer fake-jwt-token') // Passando o token JWT mockado
      .expect(201);
  
    // Atualizando o usuário após sua criação
    return request(app.getHttpServer())
      .patch(`/users/${id}`) // Alteração aqui para PATCH
      .send(updateUserDto)
      .set('Authorization', 'Bearer fake-jwt-token')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          ...updateUserDto,
          id,
        });
      });
  });
  

  it('deve remover um usuário', async () => {
    const id = 'some-uuid';

    jest.spyOn(service, 'remove').mockResolvedValueOnce({ affected: 1 } as any);

    return request(app.getHttpServer())
      .delete(`/users/${id}`)
      .set('Authorization', 'Bearer fake-jwt-token') 
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ affected: 1 });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
