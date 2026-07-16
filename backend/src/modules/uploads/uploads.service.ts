import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UploadsService {
    async uploadFile(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        return {
            originalName: file.originalname,
            filename: file.filename,
            size: file.size,
            path: file.path,
        };
    }
}
