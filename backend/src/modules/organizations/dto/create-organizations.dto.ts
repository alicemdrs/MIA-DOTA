import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrganizationsDto {
    @IsString()
    @IsNotEmpty()
    nome!: string;

    @IsString()
    @IsNotEmpty()
    cnpj!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    telefone!: string;

    @IsString()
    @IsOptional()
    chavePix?: string;
}