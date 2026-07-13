import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateOrganizationsDto {
    @IsString()
    @IsOptional()
    nome?: string;

    @IsString()
    @IsOptional()
    cnpj?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    telefone?: string;

    @IsString()
    @IsOptional()
    chavePix?: string;
}