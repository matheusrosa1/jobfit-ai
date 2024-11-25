import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Criar um novo usuário
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário com a senha criptografada
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    delete user.password;

    return user;
  }

  // Retornar todos os usuários
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Retornar um único usuário pelo ID
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Atualizar um usuário pelo ID
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // Valida se o usuário existe
    Object.assign(user, updateUserDto); // Atualiza os dados do usuário
    return await this.userRepository.save(user);
  }

  // Remover um usuário pelo ID
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id); // Valida se o usuário existe
    await this.userRepository.remove(user);
  }
}
