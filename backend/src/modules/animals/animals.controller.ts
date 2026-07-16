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
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalsService } from './animals.service';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animals')
export class AnimalsController {
    constructor(private readonly animalsService: AnimalsService) {}
    
    @Post()
    criar(@Body() dados: CreateAnimalDto) {
        return this.animalsService.criar(dados);
    }

    @Get()
    listar(@Query('nome') nome?: string) {
        return this.animalsService.listar(nome);
    }

    @Get(':id')
    buscarPorId(@Param('id') id: number) {
        return this.animalsService.buscarPorId(id);
    }

    @Get(':organizacaoId')
    buscarPorOrganizacao(@Param('organizacaoId') organizacaoId: number) {
        return this.animalsService.buscarPorOrganizacao(organizacaoId);
    }

    @Put(':id')
    atualizarCompleto(
        @Param('id') id: number,
        @Body() dados: CreateAnimalDto,
    ) {
        return this.animalsService.atualizarCompleto(id, dados);
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id') id: number,
        @Body() dados: UpdateAnimalDto,
    ) {
        return this.animalsService.atualizarParcial(id, dados);
    }

    @Delete(':id')
    deletar(@Param('id') id: number) {
        return this.animalsService.deletar(id);
    }   

}
