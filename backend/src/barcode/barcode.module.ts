import { Module } from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { BarcodeController } from './barcode.controller';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule],
    providers: [BarcodeService],
    controllers: [BarcodeController],
    exports: [BarcodeService],
})
export class BarcodeModule {}
