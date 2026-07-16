import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
  } from 'class-validator';
  
export class CreateAnimalDto {
    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsString()
    @IsNotEmpty()
    especie!: string;

    @IsString()
    @IsNotEmpty()
    porte!: string;

    @IsNumber()
    @Min(0)
    idadeAproximada!: number;

    @IsString()
    @IsNotEmpty()
    descricao!: string;

    @IsString()
    @IsNotEmpty()
    status!: string;

    @IsNumber()
    @Min(1)
    id!: number;

    @IsNotEmpty()
    dataCadastro!: Date;
}
