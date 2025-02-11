import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';


@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }
}