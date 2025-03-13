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
import {
  CreateUserBodyDto,
  GetUserOperationDto,
  UpdateUserBodyDto,
} from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'The list of users.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'Create a new user data infos' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: CreateUserBodyDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'Update user info' })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') param: GetUserOperationDto,
    @Body() body: UpdateUserBodyDto,
  ) {
    return this.usersService.update(param.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  delete(@Param('id') param: GetUserOperationDto) {
    return this.usersService.delete(param.id);
  }
}
