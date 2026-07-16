import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

type Animal = CreateAnimalDto & {
  id: number;
  dataCadastro: Date;
  status: 'Disponível' | 'Adotado';
};

@Injectable()
export class AnimalsService {
    private animals: Animal[] = [
        {
         id: 1,
         nome: 'Rex',
         especie: 'Cachorro',
         idadeAproximada: 3,
         status: 'Disponível',
         porte: 'Grande',
         descricao: 'Um cachorro amigável e brincalhão.',
         organizationId: 1,
         dataCadastro: new Date('2023-01-15'),
        photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500' 
        },
        {
         id: 2,
         nome: 'Mia',
         especie: 'Gato',
         idadeAproximada: 2,
         status: 'Disponível',
         porte: 'Pequeno',
         descricao: 'Uma gata carinhosa e independente.',
         organizationId: 1,
         dataCadastro: new Date('2023-02-10'),
         photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500' ,
        },
        {
         id: 3,
         nome: 'Bobby',
         especie: 'Cachorro',
         idadeAproximada: 4,
         status: 'Adotado',
         porte: 'Médio',
         descricao: 'Um cachorro ativo e curioso.',
         organizationId: 2,
         dataCadastro: new Date('2023-03-05'),
         photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500' ,
        },
         {
         id: 4,
         nome: 'Luna',
         especie: 'Gato',
         idadeAproximada: 1,
         status: 'Disponível',
         porte: 'Pequeno',
         descricao: 'Uma gatinha brincalhona e afetuosa.',
         organizationId: 2,
         dataCadastro: new Date('2023-04-20'),
         photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500' // <-- APAGUE ESTE LINK E COLE O SEU
        },
        {
         id: 5,
         nome: 'Max',
         especie: 'Cachorro',
         idadeAproximada: 5,
         status: 'Adotado',
         porte: 'Grande',
         descricao: 'Um cachorro leal e protetor.',
         organizationId: 3,
         dataCadastro: new Date('2023-05-12'),
         photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500' // <-- APAGUE ESTE LINK E COLE O SEU
        },
        {
         id: 6,
         nome: 'Bella',
         especie: 'Gato',
         idadeAproximada: 3,
         status: 'Disponível',
         porte: 'Médio',
         descricao: 'Uma gata elegante e independente.',
         organizationId: 3,
         dataCadastro: new Date('2023-06-08'),
         photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500' // <-- APAGUE ESTE LINK E COLE O SEU
        }
    ];

    criar(dados: CreateAnimalDto) {     
        const newAnimal: Animal = {
            id: this.animals.length + 1,
            ...dados,
            status: 'Disponível',
            dataCadastro: new Date(),
        };
        this.animals.push(newAnimal);
        return newAnimal;
    }

    listar(nome?: string) {
    
    if (nome) {
        return this.animals.filter((animal) => animal.nome.includes(nome));
    }

    return this.animals;
  }

  buscarPorId(id: number) {
    const animal = this.animals.find((animal) => animal.id === id);
    if (!animal) {
      throw new NotFoundException('Animal não encontrado');
    }
    return animal;
  }

  buscarPorOrganizacao(organizationId: number) {
    const organizationAnimals = this.animals.filter((animal) => animal.organizationId === organizationId);
    if (organizationAnimals.length === 0) {
      throw new NotFoundException('Nenhum animal encontrado para a organização especificada');
    }
    return organizationAnimals;
  }

  atualizarCompleto(id: number, dados: CreateAnimalDto) {
    const indice = this.animals.findIndex((animal) => animal.id === id);
    if (indice === -1) {
      throw new NotFoundException('Animal não encontrado');
    }
    const atualizado: Animal = { ...dados, id, dataCadastro: this.animals[indice].dataCadastro, status: this.animals[indice].status };
    this.animals[indice] = atualizado;
    return atualizado;
  }

  atualizarParcial(id: number, dados: Partial<UpdateAnimalDto>) {
        const animal = this.buscarPorId(id);

        if (!animal) {
            throw new NotFoundException('Animal não encontrado');
        }

        const dadosLimpos = Object.fromEntries(
            Object.entries(dados).filter(([, value]) => value !== undefined),
        );

        const atualizado = {
            ...animal,
            ...dadosLimpos,
        };

        this.animals = this.animals.map((animal) =>
            animal.id === id ? atualizado : animal,
        );

        return atualizado;
    }

    deletar(id: number) {
        const animal = this.buscarPorId(id);
    
        this.animals = this.animals.filter((animal) => animal.id !== id);
      
        return animal;
    }


    
}
