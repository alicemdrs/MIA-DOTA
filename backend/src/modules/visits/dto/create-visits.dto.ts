import {
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateVisitsDto {
    @IsString()
    @IsNotEmpty()
    nomeVisitante!: string;

    @IsString()
    @IsNotEmpty()
    telefoneVisitante!: string;

    @IsNumber()
    @IsNotEmpty()
    animalId!: number;

    @IsString()
    @IsNotEmpty()
    dataVisita!: string;

    @IsString()
    @IsNotEmpty()
    horarioVisita!: string;
}