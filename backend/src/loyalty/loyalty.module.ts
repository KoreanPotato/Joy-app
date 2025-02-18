import { Module } from '@nestjs/common';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from './loyalty.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LoyaltyController],
  providers: [LoyaltyService],
  exports: [LoyaltyService, TypeOrmModule],
})
export class LoyaltyModule {}
