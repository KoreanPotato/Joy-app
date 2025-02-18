import { Controller, Get, Post, Query } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { ParseIntPipe, ParseFloatPipe } from '@nestjs/common';


@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  
  @Get('balance')
  async getBalance(@Query('barcode') barcode: string) {
    return this.loyaltyService.getUserByBarcode(barcode);
  }

  @Post('add')
  async addPoints(
    @Query('clientId') clientId: string,
    @Query('amount', ParseFloatPipe) amount: number  
  ) {
    console.log(`Получены параметры: clientId = ${clientId}, amount = ${amount}`);
    return this.loyaltyService.addLoyaltyPoints(clientId, amount);
  }
  
  @Post('spend')
  async spendPoints(
    @Query('clientId') clientId: string,
    @Query('points', ParseFloatPipe) points: number
  ) {
    console.log(`Получены параметры: clientId = ${clientId}, amount = ${points}`);
    return this.loyaltyService.spendLoyaltyPoints(clientId, points);
  }
}



  