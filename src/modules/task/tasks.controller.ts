import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
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
  @ApiOperation({ summary: "Get all created use's tasks" })
  @ApiResponse({ status: 200, description: "The list user's tasks." })
  findAll(@Req() req: Request) {
    return this.tasksService.findAll((req as any).user?.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: '' })
  @ApiResponse({ status: 200, description: 'The task by id' })
  findOne(@Param() param: GeTaskOperationDto) {
    return this.tasksService.findOne(param);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: "Create new use' task" })
  @ApiResponse({ status: 201, description: 'Task created' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: CreateTaskBodyDto, @Req() req: Request) {
    const userId = (req as any).user?.userId;
    return this.tasksService.create(body, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: "Update use's task" })
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
  @ApiOperation({ summary: "Delete use's task" })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  delete(@Param('id') param: GeTaskOperationDto) {
    return this.tasksService.delete(param.id);
  }
}
