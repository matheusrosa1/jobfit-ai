import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Skill } from 'src/skill/entities/skill.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  // Criar um novo usuário
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, skills } = createUserDto;

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário com a senha criptografada
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      skills: skills ? skills.map((skillId) => ({ id: skillId })) : [],
    });

    await this.userRepository.save(user);

    return user; // Retorna o usuário criado
  }

  // Retornar todos os usuários
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Retornar um único usuário pelo ID
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['skills'],
    }); // Inclui as skills
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Atualizar um usuário pelo ID
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // Valida se o usuário existe

    // Verifica se skills estão sendo atualizadas e se são válidas
    if (updateUserDto.skills) {
      // Verifica se todas as skills fornecidas existem no banco de dados
      const skills = await this.skillRepository.find({
        where: {
          id: In(updateUserDto.skills), // 'In' permite buscar múltiplos IDs
        },
      });

      // Se o número de skills encontradas for diferente do número de skills enviadas, algo está errado
      if (skills.length !== updateUserDto.skills.length) {
        throw new NotFoundException('One or more skills not found');
      }

      // Atribui as skills ao usuário
      user.skills = skills;
    }

    // Atualiza os dados do usuário com o DTO fornecido
    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user); // Salva o usuário com as alterações
  }

  // Remover um usuário pelo ID
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id); // Valida se o usuário existe
    await this.userRepository.remove(user);
  }
}
