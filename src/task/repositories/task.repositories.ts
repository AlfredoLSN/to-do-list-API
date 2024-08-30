import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: number, createTaskDto: CreateTaskDto): Promise<any> {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.prisma.task.findMany();
  }

  async findById(ownerId: number, id: number): Promise<TaskEntity> {
    return this.prisma.task.findUnique({
      where: {
        id,
        ownerId,
      },
    });
  }

  async findByUser(userId: number): Promise<TaskEntity[]> {
    return this.prisma.task.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async update(
    ownerId: number,
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    try {
      const updatedUser = await this.prisma.task.update({
        where: {
          id,
          ownerId,
        },
        data: updateTaskDto,
      });
      return updatedUser;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(`Can't find task with id ${id}`);
        }
      }
    }
  }

  async delete(ownerId: number, id: number): Promise<TaskEntity> {
    try {
      const deletedTask = await this.prisma.task.delete({
        where: {
          id,
          ownerId,
        },
      });
      return deletedTask;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(`Can't find task with id ${id}`);
        }
      } else {
        console.log(err);
      }
    }
  }
}
