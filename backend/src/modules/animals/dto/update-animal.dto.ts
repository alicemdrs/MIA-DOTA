import {
    IsOptional,
    IsNumber,
    IsString,
    Min,
  } from 'class-validator';
  
  export class UpdateAnimalDto {
    @IsString()
    @IsOptional()
    nome?: string;

    @IsString()
    @IsOptional()
    especie?: string;

    @IsString()
    @IsOptional()
    porte?: string;

    @IsNumber()
    @IsOptional()
    idadeAproximada?: number;

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsString()
    @IsOptional()
    status?: 'Disponível' | 'Adotado';

    @IsNumber()
    @IsOptional()
    organizationId?: number;

    

}
