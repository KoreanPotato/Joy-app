import { Injectable } from '@nestjs/common';
import { UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoyaltyService {
  private readonly API_URL = 'http://localhost/1c-base/odata/standard.odata/';
  private readonly AUTH = {
    username: 'admin', // Логин 1С
    password: 'password' // Пароль 1С
  };
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  private async existingUser (clientId: string)  {
    const user = await this.userRepository.findOne({
        where: { id:clientId }
    });
    if (!user) {
        throw new UnauthorizedException('Invalid client id');
    }
    return user;
}

async getUserByBarcode(barcode: string) {
  try {
    const user = await this.userRepository.findOne({ where: {barcode: barcode}})
    if (!user) {
      throw new Error;
  }

    return {message: 'клиент:', user}
  } catch (error) {
    throw new BadRequestException('пользователь не найден')
  }
}

async addLoyaltyPoints(clientId: string, amount: number) {
  try {
    const user = await this.userRepository.findOne({ where: { id: clientId } });

    if (!user) {
      throw new UnauthorizedException('Invalid client id');
    }
    const points = Math.floor(amount * 0.05);

    user.balance += points;
    await this.userRepository.save(user);

    // try {
    //   const response = await axios.post(`${this.API_URL}loyalty/add`, {
    //     clientId,
    //     points
    //   }, { auth: this.AUTH });

    //   return response.data;
    // } catch (axiosError) {
    //   console.error("Ошибка при отправке данных в 1С:", axiosError.response?.data || axiosError.message);
    //   return { success: false, message: "Баллы начислены в БД, но не отправлены в 1С", user };
    // }
    return { success: true, message: "Баллы начислены", user };
    // }
  } catch (error) {
    console.error( "Ошибка начисления баллов:", error.message);
    throw new Error("Не удалось начислить баллы.");
  }
}


    async spendLoyaltyPoints(clientId: string, points: number) {
    try {
      const user = await this.existingUser(clientId)
      if (user.balance < points) {
        throw new BadRequestException("недостаточно баллов")
      }
      user.balance -= points
        await this.userRepository.save(user);
        return { success: true, message: "Списание успешно", newBalance: user.balance };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; 
      }

      console.error("Ошибка списания баллов:", error.message);
      throw new InternalServerErrorException("Не удалось списать баллы."); 
    }
}
}