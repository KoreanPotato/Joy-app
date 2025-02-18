import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BarcodeService } from './barcode/barcode.service';
import { BarcodeController } from './barcode/barcode.controller';
import { BarcodeModule } from './barcode/barcode.module';
import { LoyaltyService } from './loyalty/loyalty.service';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { LoyaltyController } from './loyalty/loyalty.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BarcodeModule,
    LoyaltyModule,
  ],
  controllers: [AppController, BarcodeController, LoyaltyController, UserController],
  providers: [AppService, BarcodeService, LoyaltyService, UserService],
})
export class AppModule {}
