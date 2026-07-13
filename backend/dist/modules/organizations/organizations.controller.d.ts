import { CreateOrganizationsDto } from './dto/create-organizations.dto';
import { OrganizationsService } from './organizations.service';
import { UpdateOrganizationsDto } from './dto/update-organizations.dto';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    criar(dados: CreateOrganizationsDto): CreateOrganizationsDto & {
        id: number;
        criadaEm: string;
    };
    listar(nome?: string): (CreateOrganizationsDto & {
        id: number;
        criadaEm: string;
    })[];
    buscarPorId(id: number): CreateOrganizationsDto & {
        id: number;
        criadaEm: string;
    };
    atualizarParcial(id: number, dados: Partial<UpdateOrganizationsDto>): {
        nome: string;
        cnpj: string;
        email: string;
        telefone: string;
        chavePix?: string;
        id: number;
        criadaEm: string;
    };
    atualizarCompleto(id: number, dados: CreateOrganizationsDto): CreateOrganizationsDto & {
        id: number;
        criadaEm: string;
    };
    deletar(id: number): CreateOrganizationsDto & {
        id: number;
        criadaEm: string;
    };
}
