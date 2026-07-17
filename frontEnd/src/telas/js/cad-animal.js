let petsArr = [];

window.addEventListener('DOMContentLoaded', () => {
    carregarOrganizacoes();
    carregarPets();
});

async function carregarOrganizacoes() {
    const selectOrg = document.getElementById('petOrg');
    try {
        const response = await fetch(`${API_URL}/organizations`);
        if (response.ok) {
            const orgs = await response.json();
            selectOrg.innerHTML = '<option value="">Selecione uma organização...</option>';
            orgs.forEach((org) => {
                const option = document.createElement('option');
                option.value = org._id || org.id;
                option.textContent = org.nome;
                selectOrg.appendChild(option);
            });
        }
    } catch (error) {
        console.warn('Usando dados fictícios para ONGs.', error);
        selectOrg.innerHTML = `
            <option value="">Selecione uma organização...</option>
            <option value="1">ONG Patinhas Felizes</option>
            <option value="2">ONG Resgate Animal</option>
        `;
    }
}

async function carregarPets() {
    const container = document.getElementById('petsContainer');
    container.innerHTML = '';

    try {
        const response = await fetch(`${API_URL}/animals`);
        if (response.ok) {
            petsArr = await response.json();
        }
    } catch (error) {
        console.warn('Usando dados simulados para pets.');
    }

    if (petsArr.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhum animal cadastrado ainda.</p>';
        return;
    }

    petsArr.forEach((pet) => {
        const imagemExibida = getPetImage(pet);
        const card = document.createElement('div');
        card.className = 'pet-card';
        card.innerHTML = `
            <img class="pet-card-img" src="${imagemExibida}" alt="Foto de ${pet.nome}">
            <div class="pet-card-body">
                <div class="pet-card-title">${pet.nome}</div>
                <div class="pet-card-info"><strong>Espécie:</strong> ${pet.especie || '—'}</div>
                <div class="pet-card-info"><strong>Porte:</strong> ${pet.porte || '—'}</div>
                <div class="pet-card-info"><strong>Sexo:</strong> ${pet.sexo || '—'}</div>
                <div class="pet-card-info"><strong>Idade:</strong> ${pet.idadeEstimada || pet.idadeAproximada || '—'}</div>
                <div class="pet-card-info"><strong>Status:</strong> ${pet.status || '—'}</div>
                <div class="pet-card-actions">
                    <button class="btn-pet-delete" onclick="deletarPet(${pet.id || pet._id})">Excluir</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

async function cadastrarPet(event) {
    event.preventDefault();

    const petData = {
        nome: document.getElementById('petName').value,
        especie: document.getElementById('petSpecies').value,
        porte: document.getElementById('petSize').value,
        sexo: document.getElementById('petGender').value,
        idadeEstimada: document.getElementById('petAge').value,
        dataChegada: document.getElementById('petArrivalDate').value,
        organizacao: document.getElementById('petOrg').value,
        status: document.getElementById('petStatus').value,
        fotoUrl: document.getElementById('petPhoto').value,
        descricao: document.getElementById('petDesc').value,
    };

    try {
        const response = await fetch(`${API_URL}/animals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(petData),
        });

        if (response.ok) {
            alert('Pet cadastrado com sucesso e inserido na vitrine!');
            document.getElementById('petForm').reset();
            carregarPets();
        } else {
            alert('Erro ao cadastrar pet no servidor.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        const novoPet = { id: Date.now(), ...petData };
        petsArr.push(novoPet);
        alert('Servidor indisponível. Pet adicionado à lista local de simulação.');
        document.getElementById('petForm').reset();
        carregarPets();
    }
}

async function deletarPet(id) {
    if (!confirm('Deseja realmente remover este animal da vitrine?')) return;

    try {
        const response = await fetch(`${API_URL}/animals/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Pet removido com sucesso!');
            carregarPets();
        } else {
            alert('Erro ao excluir o pet do servidor.');
        }
    } catch (error) {
        console.error('Erro na requisição de exclusão:', error);
        petsArr = petsArr.filter((pet) => (pet.id || pet._id) !== id);
        alert('Servidor indisponível. Removido da simulação local.');
        carregarPets();
    }
}
