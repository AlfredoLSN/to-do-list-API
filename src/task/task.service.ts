import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repositories/task.repositories';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private repository: TaskRepository) {}
  create(createTaskDto: CreateTaskDto) {
    return this.repository.create(createTaskDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<TaskEntity> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new NotFoundException(`Can't find user with id ${id}`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    return this.repository.update(id, updateTaskDto);
  }

  async remove(id: number): Promise<TaskEntity> {
    return await this.repository.delete(id);
  }
}
