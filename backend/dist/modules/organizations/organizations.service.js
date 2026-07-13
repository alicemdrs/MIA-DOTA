"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
let OrganizationsService = class OrganizationsService {
    organizacao = [
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
    criar(dados) {
        const newOrganization = {
            id: this.organizacao.length + 1,
            ...dados,
            criadaEm: new Date().toISOString(),
        };
        this.organizacao.push(newOrganization);
        return newOrganization;
    }
    listar(nome) {
        if (nome) {
            return this.organizacao.filter((org) => org.nome.includes(nome));
        }
        return this.organizacao;
    }
    buscarPorId(id) {
        const organization = this.organizacao.find((org) => org.id === id);
        if (!organization) {
            throw new Error('Organização não encontrada');
        }
        return organization;
    }
    atualizarCompleto(id, dados) {
        const indice = this.organizacao.findIndex((org) => org.id === id);
        if (indice === -1) {
            throw new common_1.NotFoundException('Organização não encontrada');
        }
        const atualizado = { id, ...dados, criadaEm: new Date().toISOString() };
        this.organizacao[indice] = atualizado;
        return atualizado;
    }
    atualizarParcial(id, dados) {
        const organization = this.buscarPorId(id);
        const atualizado = { ...organization, ...dados };
        this.organizacao = this.organizacao.map((org) => org.id === id ? atualizado : org);
        return atualizado;
    }
    deletar(id) {
        const organization = this.buscarPorId(id);
        this.organizacao = this.organizacao.filter((org) => org.id !== id);
        return organization;
    }
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)()
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map