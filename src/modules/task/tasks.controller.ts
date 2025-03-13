import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateTaskBodyDto,
  GeTaskOperationDto,
  UpdateTaskBodyDto,
} from './dto/task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: '' })
  @ApiResponse({ status: 200, description: "The list user' tasks." })
  findAll() {
    return this.tasksService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: '' })
  @ApiResponse({ status: 200, description: "The list user' tasks." })
  findOne(@Param() param: GeTaskOperationDto) {
    return this.tasksService.findOne(param);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create new task to user' })
  @ApiResponse({ status: 201, description: 'Task created' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: CreateTaskBodyDto) {
    return this.tasksService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Update task from a user' })
  @ApiResponse({ status: 200, description: 'Update user info' })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') param: GeTaskOperationDto,
    @Body() body: UpdateTaskBodyDto,
  ) {
    return this.tasksService.update(param.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete task from a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  delete(@Param('id') param: GeTaskOperationDto) {
    return this.tasksService.delete(param.id);
  }
}
