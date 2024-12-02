import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}
  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    try {
      const newUser = this.authRepository.create(createAuthDto);
      return await this.authRepository.save(newUser);
    } catch (error) {
      const UniqueVioletionErrorCode = '23505';
      if (error.code === UniqueVioletionErrorCode) {
        throw new ConflictException('This user already Exist');
      }
    }
  }

  async findAll() {
    return await this.authRepository.find();
  }

  async findOne(id: string): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not exist');
    }
    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<Auth> {
    const user = await this.authRepository.preload({ id, ...updateAuthDto });
    if (!user) {
      throw new NotFoundException('User not exist');
    }
    return await this.authRepository.save(user);
  }

  async remove(id: string): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not exist');
    }
    this.authRepository.remove(user);
    return user;
  }
}
