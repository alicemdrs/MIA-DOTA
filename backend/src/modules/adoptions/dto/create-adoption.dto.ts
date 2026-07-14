import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateAdoptionDto {
  @IsString()
  @IsNotEmpty()
  nomeAdotante!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  telefone!: string;

  @IsString()
  @IsNotEmpty()
  endereco!: string;

  @IsString()
  @IsNotEmpty()
  justificativa!: string;
  
  @IsNumber()
  @Min(1)
  animalId!: number;

  @IsString()
  @IsNotEmpty()
  status!: string;

}