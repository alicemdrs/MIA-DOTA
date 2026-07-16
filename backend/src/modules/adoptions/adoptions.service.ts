import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { Express } from 'express';
import  multipart from 'multer';


type ArquivoRecebido = {
  nomeOriginal: string;
  tipo: string;
  tamanho: number;
};


type Adoption = CreateAdoptionDto & {
  id: number;
  status: string;
  comprovanteIdentidade?: ArquivoRecebido;
};

@Injectable()
export class AdoptionsService {
    private adoptions: Adoption[] = [
        {
          id: 1, 
          animalId: 1, 
          nomeAdotante: 'João Silva', 
          email: 'joao.silva@email.com', 
          telefone: '123456789', 
          endereco: 'Rua A, 123', 
          justificativa: 'Quero um amigo para brincar', 
          status: 'pendente'
        },
        { 
          id: 2, 
          animalId: 2, 
          nomeAdotante: 'Maria Souza', 
          email: 'maria.souza@email.com', 
          telefone: '987654321', 
          endereco: 'Rua B, 456', 
          justificativa: 'Quero um animal de estimação', 
          status: 'pendente'
        },
        {
          id: 3, 
          animalId: 3, 
          nomeAdotante: 'Carlos Oliveira', 
          email: 'carlos.oliveira@email.com', 
          telefone: '555555555', 
          endereco: 'Rua C, 789', 
          justificativa: 'Quero um animal de estimação', 
          status: 'aprovado'
        }
    ];
  
    criar(dados: CreateAdoptionDto, 
      comprovante: Express.Multer.File) {
        const newAdoption: Adoption = {
            id: this.adoptions.length + 1,
            ...dados,
            comprovanteIdentidade: {
              nomeOriginal: comprovante.originalname,
              tipo: comprovante.mimetype,
              tamanho: comprovante.size,
      },

        };
        this.adoptions.push(newAdoption);
        return newAdoption;
    }

    listar(nomeAdotante?: string) {

    if (nomeAdotante) {
      return this.adoptions.filter((adop) => adop.nomeAdotante.includes(nomeAdotante));
    }

    return this.adoptions;
  }

  buscarPorId(id: number) {
    const adoption = this.adoptions.find((adop) => adop.id === id);
    if (!adoption) {
      throw new NotFoundException('Adoção não encontrada');
    }
    return adoption;
  }

  atualizarCompleto(id: number, dados: CreateAdoptionDto) {
    const indice = this.adoptions.findIndex((adop) => adop.id === id);
    if (indice === -1) {
      throw new NotFoundException('Adoção não encontrada');
    }
    const atualizado: Adoption = { id, ...dados };
    this.adoptions[indice] = atualizado;
    return atualizado;
  }

  atualizarParcial(id: number, dados: UpdateAdoptionDto) {
    const adoption = this.buscarPorId(id);
    const atualizado: Adoption = { ...adoption, ...dados };

    this.adoptions = this.adoptions.map((adop) => 
        adop.id === id ? atualizado : adop
    );

    return atualizado;
  }

  deletar(id: number) {
    const adoption = this.buscarPorId(id);

    this.adoptions = this.adoptions.filter((adop) => adop.id !== id);

    return adoption;
  }
}