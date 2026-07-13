import {
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
} from 'class-validator';

export class UpdateVisitsDto {
    @IsString()
    @IsOptional()
    nomeVisitante?: string;

    @IsString()
    @IsOptional()
    telefoneVisitante?: string;

    @IsNumber()
    @IsOptional()
    animalId?: number;

    @IsString()
    @IsOptional()
    dataVisita?: string;

    @IsString()
    @IsOptional()
    horarioVisita?: string;
}