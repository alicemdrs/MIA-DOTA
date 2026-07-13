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
import { ParseIntPipe } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitsDto } from './dto/create-visits.dto';
import { UpdateVisitsDto } from './dto/update-visits.dto';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

@Post()
  create(
    @Body() createVisitsDto: CreateVisitsDto) {
    return this.visitsService.criar(createVisitsDto);
  }

  @Get()
  listar(
    @Query('nomeVisitante') nomeVisitante?: string,
  ) {
    return this.visitsService.listar(nomeVisitante);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.visitsService.buscarPorId(id);
  }

  @Patch(':id')
  atualizarParcial(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: UpdateVisitsDto) {
    return this.visitsService.atualizarParcial(id, dados);
  }

  @Put(':id')
  atualizarCompleto(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: CreateVisitsDto) {
    return this.visitsService.atualizarCompleto(id, dados);
  }

    @Delete(':id')
    deletar(
    @Param('id', ParseIntPipe) id: number) {
    return this.visitsService.deletar(id);
  }

    @Patch(':id/aprovar')
    aprovar(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.visitsService.aprovar(id);
    }

    @Patch(':id/rejeitar')
    rejeitar(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.visitsService.rejeitar(id);
    }

    @Patch(':id/concluir')
    concluir(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.visitsService.concluir(id);
    }
}
