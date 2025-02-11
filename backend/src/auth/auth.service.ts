import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async generateToken(payload: object): Promise<{ accessToken: string }> {
    const token = await this.jwtService.signAsync(payload);
    return { accessToken: token };
}

  async register(email: string, name: string, password: string): Promise<{ user: User; accessToken: string }> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, name, password: hashedPassword });
    await this.userRepository.save(user);

    const token = await this.generateToken({ id: user.id, email: user.email });

    return { user, ...token };
  }

  async login(email: string, password: string): Promise<{ user: User; accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken: string = (await this.generateToken({ id: user.id, email: user.email })).accessToken;

    return { user, accessToken };
}
}
