import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserBodyDto } from './dto/user.dto';

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

    const user = this.userRepository.create({
      ...newUser,
      picture: imageURL.request.res.responseUrl,
    });
    return this.userRepository.save(user);
  }
}
