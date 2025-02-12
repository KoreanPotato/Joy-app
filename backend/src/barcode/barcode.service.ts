import { Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import * as bwipjs from 'bwip-js';

@Injectable()
export class BarcodeService {
    private readonly nanoid = customAlphabet('1234567890', 12); 

    generateBarcode(): string {
        return this.nanoid(); 
    }

    async generateBarcodeImage(barcode: string): Promise<Buffer> {
        return await bwipjs.toBuffer({
            bcid: 'code128', 
            text: barcode, 
            scale: 3, 
            height: 10, 
            includetext: true, 
            textxalign: 'center',
        });
    }
}
