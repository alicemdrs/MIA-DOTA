import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Put,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { AdoptionsService } from './adoptions.service';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

const TAMANHO_MAXIMO_ARQUIVO = 5 * 1024 * 1024; // 5MB


@Controller('adoptions')
export class AdoptionsController {
    constructor(private readonly adoptionsService: AdoptionsService) {}


    @Post('com-arquivo')
    @UseInterceptors(
        FileInterceptor('comprovante', {
            limits: {
                fileSize: TAMANHO_MAXIMO_ARQUIVO,
            },
        }),
    )
    criar(
        @Body() body: CreateAdoptionDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: /^(application\/pdf|image\/png|image\/jpeg)$/,
            })
            .addMaxSizeValidator({
                maxSize: TAMANHO_MAXIMO_ARQUIVO,
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            }),
        )
        comprovante: Express.Multer.File,
    ) {
        return this.adoptionsService.criar(body, comprovante);
    }

    @Get()
    listar(@Query('nomeAdotante') nomeAdotante?: string) {
        return this.adoptionsService.listar(nomeAdotante);
    }

    @Get(':id')
    buscarPorId(@Param('id') id: number) {
        return this.adoptionsService.buscarPorId(id);
    }

    @Put(':id')
    atualizarCompleto(
        @Param('id') id: number,
        @Body() dados: CreateAdoptionDto,
    ) {
        return this.adoptionsService.atualizarCompleto(id, dados);
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id') id: number,
        @Body() dados: UpdateAdoptionDto,
    ) {
        return this.adoptionsService.atualizarParcial(id, dados);
    }

    @Delete(':id')
    deletar(@Param('id') id: number) {
        return this.adoptionsService.deletar(id);
    }
}
