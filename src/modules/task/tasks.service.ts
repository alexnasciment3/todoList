import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task/task.entity';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import {
  CreateTaskBodyDto,
  GeTaskOperationDto,
  UpdateTaskBodyDto,
} from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(userId: string): Promise<Task[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return this.taskRepository.find({
      relations: ['user'],
      where: {
        user,
      },
    });
  }

  async findOne(param: GeTaskOperationDto): Promise<Task> {
    const { id } = param;

    const fetchedTask = await this.taskRepository.findOne({ where: { id } });

    if (!fetchedTask) throw new NotFoundException(`Not found task id: ${id}`);

    return fetchedTask;
  }

  async create(
    createTaskDto: CreateTaskBodyDto,
    userId: string,
  ): Promise<Task> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user,
      isDone: false,
    });
    return this.taskRepository.save(newTask);
  }

  async update(id: string, updateTaskDto: UpdateTaskBodyDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async delete(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
