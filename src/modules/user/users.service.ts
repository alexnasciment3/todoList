import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserBodyDto, UpdateUserBodyDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(newUser: CreateUserBodyDto): Promise<User> {
    const imageURL = await axios.get('https://picsum.photos/200');
    console.log('===>', newUser.birthday);
    try {
      const user = this.userRepository.create({
        ...newUser,
        birthday: newUser.birthday,
        picture: imageURL.request.res.responseUrl,
      });
      return this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async update(id: string, data: UpdateUserBodyDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}
