import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };
    return this.repository.create(userWithHashedPassword);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException(`Can't finf user with id ${id}`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`Can't find user with email ${email}`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
    const temp = { ...updateUserDto, password: hashedPassword };
    return this.repository.update(id, temp);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
