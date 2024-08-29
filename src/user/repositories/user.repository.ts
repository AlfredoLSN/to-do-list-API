import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: number): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
      return updatedUser;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(`Can't find user with id ${id}`);
        }
      }
    }
  }

  async delete(id: number): Promise<UserEntity> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return deletedUser;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(`Can't find user with id ${id}`);
        }
      }
    }
  }
}
