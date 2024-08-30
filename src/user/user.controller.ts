import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskService } from 'src/task/task.service';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  //ROTAS DE USUARIOS

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  //ROTAS DE TASKS

  @Post('/:id/task')
  createTask(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(+id, createTaskDto);
  }

  @Get(':id/tasks')
  getTasks(@Param('id') id: string) {
    return this.taskService.findByUserId(+id);
  }

  @Get(':id/task/:taskId')
  getTaskById(@Param('id') id: string, @Param('taskId') taskId: number) {
    return this.taskService.findByTaskId(+id, +taskId);
  }

  @Patch(':id/task/:taskId')
  updateTask(
    @Param('id') id: string,
    @Param('taskId') taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(+id, +taskId, updateTaskDto);
  }

  @Delete(':id/task/:taskId')
  deleteTask(@Param('id') id: string, @Param('taskId') taskId: string) {
    return this.taskService.remove(+id, +taskId);
  }
}
