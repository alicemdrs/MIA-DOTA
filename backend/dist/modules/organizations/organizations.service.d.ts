import { CreateOrganizationsDto } from './dto/create-organizations.dto';
import { UpdateOrganizationsDto } from './dto/update-organizations.dto';
type Organization = CreateOrganizationsDto & {
    id: number;
    criadaEm: string;
};
export declare class OrganizationsService {
    private organizacao;
    criar(dados: CreateOrganizationsDto): Organization;
    listar(nome?: string): Organization[];
    buscarPorId(id: number): Organization;
    atualizarCompleto(id: number, dados: CreateOrganizationsDto): Organization;
    atualizarParcial(id: number, dados: UpdateOrganizationsDto): {
        nome: string;
        cnpj: string;
        email: string;
        telefone: string;
        chavePix?: string;
        id: number;
        criadaEm: string;
    };
    deletar(id: number): Organization;
}
export {};
