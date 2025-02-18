import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { BarcodeService } from './barcode.service';
import { UserService } from '../user/user.service';

@Controller('barcode')
export class BarcodeController {
    constructor(
        private readonly barcodeService: BarcodeService,
        private readonly userService: UserService,
    ) {}

    @Get(':id')
    async getBarcode(@Param('id') id: string, @Res() res: Response) {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const barcodeBuffer = await this.barcodeService.generateBarcodeImage(user.barcode);

        res.setHeader('Content-Type', 'image/png');
        res.send(barcodeBuffer);
    }
}
