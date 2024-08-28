import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.prisma.task.findMany();
  }

  async findById(id: number): Promise<TaskEntity> {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<any> {
    try {
      const updatedUser = await this.prisma.task.update({
        where: {
          id,
        },
        data: updateTaskDto,
      });
      return updatedUser;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(`Can´t find user with id ${id}`);
        }
      }
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const deletedUser = await this.prisma.task.delete({
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
