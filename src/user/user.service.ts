import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  findAll() {
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
