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

    @IsNumber()
    @IsNotEmpty()
    organizationId!: number;

    @IsString()
    @IsNotEmpty()
    descricao!: string;

   

}
