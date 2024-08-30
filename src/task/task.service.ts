import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repositories/task.repositories';
import { TaskEntity } from './entities/task.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    private repository: TaskRepository,
    private userService: UserService,
  ) {}
  create(userId: number, createTaskDto: CreateTaskDto) {
    return this.repository.create(userId, createTaskDto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findByTaskId(userId: number, id: number): Promise<TaskEntity> {
    const task = await this.repository.findById(userId, id);
    if (!task) {
      throw new NotFoundException(`Can't find task with id ${id}`);
    }
    return task;
  }

  async findByUserId(userId: number): Promise<TaskEntity[]> {
    const tasks = await this.repository.findByUser(userId);
    console.log(tasks);
    return tasks;
  }

  async update(
    userId: number,
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    return this.repository.update(userId, id, updateTaskDto);
  }

  async remove(userId: number, id: number): Promise<TaskEntity> {
    return this.repository.delete(userId, id);
  }
}
