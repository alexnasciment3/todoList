import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskBodyDto, UpdateTaskBodyDto } from './dto/task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: '' })
  @ApiResponse({ status: 200, description: "The list user' tasks." })
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create new task to user' })
  @ApiResponse({ status: 201, description: 'Task created' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: CreateTaskBodyDto) {
    return this.tasksService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update task from a user' })
  @ApiResponse({ status: 200, description: 'Update user info' })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() body: UpdateTaskBodyDto) {
    return this.tasksService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task from a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
