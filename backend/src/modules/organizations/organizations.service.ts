import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationsDto } from './dto/create-organizations.dto';
import { UpdateOrganizationsDto } from './dto/update-organizations.dto';

type Organization = CreateOrganizationsDto & { 
    id: number;
    criadaEm: string;
};

@Injectable()
export class OrganizationsService {
    private organizacao: Organization[] = [
        {
            id: 1,
            nome: 'Org Pets',
            cnpj: '12345678901234',
            email: 'organization1@example.com',
            telefone: '1234567890',
            chavePix: 'org1@exemplo.com',
            criadaEm: new Date().toISOString(),
        },
        {
            id: 2,
            nome: 'Pets Care',
            cnpj: '98765432109876',
            email: 'org2@example.com',
            telefone: '0987654321',
            chavePix: '84999345674',
            criadaEm: new Date().toISOString(),
        },
        {
            id: 3,
            nome: 'Pets Amigos',
            cnpj: '56789012345678',
            email: 'org3@example.com',
            telefone: '1111111111',
            chavePix: '56789012345678',
            criadaEm: new Date().toISOString(),
        }

    ];

    criar(dados: CreateOrganizationsDto) {
        const newOrganization: Organization = {
            id: this.organizacao.length + 1,
            ...dados,
            criadaEm: new Date().toISOString(),
        };
        this.organizacao.push(newOrganization);
        return newOrganization;
    }

    listar(nome?: string) {
        if (nome) {
            return this.organizacao.filter((org) => org.nome.includes(nome));
        }

        return this.organizacao;
    }

    buscarPorId(id: number) {
        const organization = this.organizacao.find((org) => org.id === id);

        if (!organization) {
            throw new Error('Organização não encontrada');
        }

        return organization;
    }

    atualizarCompleto(id: number, dados: CreateOrganizationsDto) {
    const indice = this.organizacao.findIndex((org) => org.id === id);

    if (indice === -1) {
      throw new NotFoundException('Organização não encontrada');
    }

    const atualizado: Organization = { id, ...dados, criadaEm: new Date().toISOString() };
    this.organizacao[indice] = atualizado;
    return atualizado;
  }

    atualizarParcial(id: number, dados: UpdateOrganizationsDto) {
        const organization = this.buscarPorId(id);
        const atualizado = { ...organization, ...dados };

        this.organizacao = this.organizacao.map((org) =>
            org.id === id ? atualizado : org,
        );

        return atualizado;  
    }

    deletar(id: number) {
        const organization = this.buscarPorId(id);

        this.organizacao = this.organizacao.filter((org) => org.id !== id);

        return organization;
    }
}
