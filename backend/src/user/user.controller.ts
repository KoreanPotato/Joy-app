import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
