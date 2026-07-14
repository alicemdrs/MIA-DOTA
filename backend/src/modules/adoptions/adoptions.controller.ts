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
} from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { AdoptionsService } from './adoptions.service';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';

@Controller('adoptions')
export class AdoptionsController {
    constructor(private readonly adoptionsService: AdoptionsService) {}

    @Post()
    criar(@Body() dados: CreateAdoptionDto) {
        return this.adoptionsService.criar(dados);
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
