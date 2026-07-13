import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitsDto } from './dto/create-visits.dto';
import { UpdateVisitsDto } from './dto/update-visits.dto';

type Visit = CreateVisitsDto & {
    id: number;
    criadaEm: string;
    status: VisitStatus;
};

export enum VisitStatus {
    PENDENTE = 'pendente',
    APROVADO = 'aprovado',
    REJEITADO = 'rejeitado',
    REALIZADA  = 'realizada',
}

@Injectable()
export class VisitsService {
    private visitas: Visit[] = [
        {
            id: 1,
            nomeVisitante: 'João Silva',
            telefoneVisitante: '1234567890',
            animalId: 1,
            dataVisita: '2023-06-01',
            horarioVisita: '10:00',
            criadaEm: new Date().toISOString(),
            status: VisitStatus.PENDENTE,
        },
        {
            id: 2,
            nomeVisitante: 'Maria Souza',
            telefoneVisitante: '0987654321',
            animalId: 2,
            dataVisita: '2023-06-02',
            horarioVisita: '14:00',
            criadaEm: new Date().toISOString(),
            status: VisitStatus.APROVADO,
        },
    ];

    criar(dados: CreateVisitsDto) {
        const newVisit: Visit = {
            id: this.visitas.length + 1,
            ...dados,
            criadaEm: new Date().toISOString(),
            status: VisitStatus.PENDENTE,
        };
        this.visitas.push(newVisit);
        return newVisit;
    }

    listar(nomeVisitante?: string) {
        if (nomeVisitante) {
            return this.visitas.filter((visit) => visit.nomeVisitante === nomeVisitante);
        }

        return this.visitas;
    }

    buscarPorId(id: number) {
        return this.visitas.find((visit) => visit.id === id);
    }

    atualizarCompleto(id: number, dados: CreateVisitsDto) {
        const indice = this.visitas.findIndex((visit) => visit.id === id);
    
        if (indice === -1) {
          throw new NotFoundException('Visita não encontrada');
        }
    
        const atual = this.visitas[indice];
        
        const atualizado: Visit = { 
            ...atual,
            id, 
            ...dados, 
            criadaEm: atual.criadaEm,
            status: atual.status,
        
        };
        this.visitas[indice] = atualizado;
        return atualizado;
    }
    
    atualizarParcial(id: number, dados: Partial<UpdateVisitsDto>) {
        const visit = this.buscarPorId(id);

        if (!visit) {
            throw new NotFoundException('Visita não encontrada');
        }

        const dadosLimpos = Object.fromEntries(
            Object.entries(dados).filter(([, value]) => value !== undefined),
        );

        const atualizado = {
            ...visit,
            ...dadosLimpos,
        };

        this.visitas = this.visitas.map((v) =>
            v.id === id ? atualizado : v,
        );

        return atualizado;
    }
    
    deletar(id: number) {
        const visit = this.buscarPorId(id);
    
        this.visitas = this.visitas.filter((v) => v.id !== id);
    
        return visit;
    }

    aprovar(id: number) {
        const visita = this.buscarPorId(id);

        if (!visita) {
            throw new NotFoundException('Visita não encontrada');
        }

        if (visita.status !== VisitStatus.PENDENTE) {
            throw new BadRequestException(
            'Apenas visitas pendentes podem ser aprovadas.',
            );
        }

        visita.status = VisitStatus.APROVADO;

        return visita;
    }

    rejeitar(id: number) {
        const visita = this.buscarPorId(id);

        if (!visita) {
            throw new NotFoundException('Visita não encontrada');
        }

        if (visita.status !== VisitStatus.PENDENTE) {
            throw new BadRequestException(
            'Apenas visitas pendentes podem ser rejeitadas.',
            );
        }

        visita.status = VisitStatus.REJEITADO;

        return visita;
    }

    concluir(id: number) {
        const visita = this.buscarPorId(id);

        if (!visita) {
            throw new NotFoundException('Visita não encontrada');
        }

        if (visita.status !== VisitStatus.APROVADO) {
            throw new BadRequestException(
            'Somente visitas aprovadas podem ser concluídas.',
            );
        }

        visita.status = VisitStatus.REALIZADA;

        return visita;
        }
}
