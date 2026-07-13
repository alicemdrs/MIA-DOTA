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
import {  CreateOrganizationsDto } from './dto/create-organizations.dto';
import { OrganizationsService } from './organizations.service';
import { UpdateOrganizationsDto } from './dto/update-organizations.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

    @Post()
    criar(@Body() dados: CreateOrganizationsDto) {
        return this.organizationsService.criar(dados);
    }

    @Get()
    listar(
        @Query('nome') nome?: string,
    ) {
        return this.organizationsService.listar(nome);
    }

    @Get(':id')
    buscarPorId(@Param('id') id: number) {
        return this.organizationsService.buscarPorId(id);
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id') id: number,
        @Body() dados: Partial<UpdateOrganizationsDto>) {
        return this.organizationsService.atualizarParcial(id, dados);
    }

    @Put(':id')
    atualizarCompleto(
        @Param('id') id: number,
        @Body() dados: CreateOrganizationsDto) {
        return this.organizationsService.atualizarCompleto(id, dados);
    }

    @Delete(':id')
    deletar(@Param('id') id: number) {
        return this.organizationsService.deletar(id);
    }
}
