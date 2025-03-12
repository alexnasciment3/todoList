import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task/task.entity';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskBodyDto, UpdateTaskBodyDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['user'],
    });
  }

  async create(createTaskDto: CreateTaskBodyDto): Promise<Task> {
    const user = await this.userRepository.findOne({
      where: { id: createTaskDto.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const newTask = this.taskRepository.create({ ...createTaskDto, user });
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
