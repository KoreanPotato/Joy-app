import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { BarcodeService } from 'src/barcode/barcode.service';


@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly barcodeService: BarcodeService
  ) {}

  async generateToken(payload: object): Promise<{ accessToken: string }> {
    const token = await this.jwtService.signAsync(payload);
    return { accessToken: token };
}

  async register(email: string, name: string, password: string, birthdate: Date): Promise<{ user: User; accessToken: string }> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const age = this.calculateAge(birthdate);
        if (age < 18) {
            throw new BadRequestException('You must be at least 18 years old to register');
        }

    const hashedPassword = await bcrypt.hash(password, 10);
    const barcode = this.barcodeService.generateBarcode()

    const user = this.userRepository.create({ email, name, password: hashedPassword, birthdate, barcode });
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

private calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }

  return age;
}

}
