import { IsEmail, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateAdoptionDto {
  @IsOptional()
  @IsString()
  nomeAdotante?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsString()
  justificativa?: string;
  
  @IsOptional()
  @IsNumber()
  @Min(1)
  animalId?: number ;

  @IsOptional()
  @IsString()
  status?: string;

}

