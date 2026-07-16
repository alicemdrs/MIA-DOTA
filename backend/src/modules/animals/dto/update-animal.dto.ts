import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
  } from 'class-validator';
  
  export class UpdateAnimalDto {
    @IsString()
    @IsNotEmpty()
    nome?: string;

    @IsString()
    @IsNotEmpty()
    especie?: string;

    @IsString()
    @IsNotEmpty()
    porte?: string;

    @IsNumber()
    @Min(0)
    idadeAproximada?: number;

    @IsString()
    @IsNotEmpty()
    descricao?: string;

    @IsString()
    @IsNotEmpty()
    status?: string;

    @IsString()
    @IsNotEmpty()
    id?: string;

    @IsNotEmpty()
    dataCadastro?: Date;
}
