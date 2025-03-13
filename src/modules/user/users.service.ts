import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { hash } from 'bcrypt-ts';
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

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async create(newUser: CreateUserBodyDto): Promise<User> {
    const imageURL = await axios.get('https://picsum.photos/200');

    const emailAlreadyInUse = await this.userRepository.findOne({
      where: { email: newUser.email },
    });

    if (emailAlreadyInUse)
      throw new BadRequestException('Email already in use');

    try {
      const user = this.userRepository.create({
        ...newUser,
        birthday: newUser.birthday,
        password: await hash(newUser.password, 10),
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
