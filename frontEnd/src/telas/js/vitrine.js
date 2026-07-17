let petsArr = [];

const mockPets = [
    {
        _id: '1',
        name: 'Pipoca',
        species: 'Cão',
        size: 'PEQUENO',
        description: 'Muito dócil, adora crianças e brincar com bolinhas.',
        photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500',
    },
    {
        _id: '2',
        name: 'Mingau',
        species: 'Gato',
        size: 'MEDIO',
        description: 'Calmo, companheiro e adora um colinho no inverno.',
        photoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500',
    },
];

window.onload = function () {
    loadOrganizations();

    const savedPreference = getCookie('pref_especie');
    const filter = savedPreference || 'TODOS';
    const filterEl = document.getElementById('speciesFilter');
    if (filterEl) filterEl.value = filter;
    loadAnimals(filter);
};

function handleFilterChange(value) {
    setCookie('pref_especie', value, 7);
    loadAnimals(value);
}

async function loadAnimals(filterValue) {
    const grid = document.getElementById('petGrid');
    grid.innerHTML = '<p class="empty-message">Carregando pets fofinhos...</p>';

    let pets = [];

    if (localStorage.getItem('token') === 'mock-jwt-token-adotante') {
        pets = mockPets;
    } else {
        try {
            const res = await fetch(`${API_URL}/animals`);
            if (res.ok) pets = await res.json();
        } catch (e) {
            pets = mockPets;
        }
    }

    pets = pets.filter((p) => matchesSpeciesFilter(p, filterValue));

    grid.innerHTML = '';
    if (pets.length === 0) {
        grid.innerHTML = '<p class="empty-message">Nenhum bichinho encontrado nessa categoria.</p>';
        return;
    }

    pets.forEach((pet) => {
        const imagemExibida = getPetImage(pet);
        const petId = pet.id || pet._id;
        const petNome = pet.nome || pet.name;

        grid.innerHTML += `
            <div class="pet-card">
                <div class="pet-image-container">
                    <img src="${imagemExibida}" alt="${petNome}">
                    <span class="pet-badge">${pet.porte || pet.size || ''}</span>
                </div>
                <div class="pet-info">
                    <h2>${petNome}</h2>
                    <span class="pet-details">${pet.especie || pet.species || ''}</span>
                    <p class="pet-desc">${pet.descricao || pet.description || ''}</p>
                    <button class="btn-adopt" onclick="irParaFormulario('${petId}', '${String(petNome).replace(/'/g, "\\'")}')">Quero Adotar</button>
                </div>
            </div>
        `;
    });
}

function irParaFormulario(id, nome) {
    window.location.href = `formAdocao.html?petId=${id}&petNome=${nome}`;
}

async function loadOrganizations() {
    try {
        const response = await fetch(`${API_URL}/organizations`);
        if (!response.ok) throw new Error('Erro ao buscar organizações');

        const orgs = await response.json();
        if (orgs && orgs.length > 0) {
            renderAllFooters(orgs);
        } else {
            renderFallbackFooter();
        }
    } catch (error) {
        console.error('Não foi possível carregar as organizações. Usando fallback.', error);
        renderFallbackFooter();
    }
}

function renderAllFooters(orgs) {
    const footerContainer = document.getElementById('footerContainer');
    footerContainer.innerHTML = '';

    orgs.forEach((org) => {
        footerContainer.innerHTML += `
            <div class="footer-section">
                <h4>${org.nome || 'Mia Dota'}</h4>
                <p>CNPJ: ${org.cnpj || 'Não informado'}</p>
                <p>Telefone: <span class="highlight">${org.telefone || 'Não cadastrado'}</span></p>
                <p>E-mail: <span class="highlight">${org.email || 'Não cadastrado'}</span></p>
                <p>Chave Pix: <span class="highlight">${org.chavePix || 'Não cadastrada'}</span></p>
            </div>
        `;
    });
}

function renderFallbackFooter() {
    const footerContainer = document.getElementById('footerContainer');
    footerContainer.innerHTML = `
        <div class="footer-section">
            <h4>Sobre o Mia Dota</h4>
            <p>Conectando corações e unindo pets resgatados às suas novas famílias perfeitas.</p>
        </div>
        <div class="footer-section">
            <h4>Contato</h4>
            <p>Telefone: <span class="highlight">(11) 99999-9999</span></p>
            <p>E-mail: <span class="highlight">contato@miadota.org</span></p>
        </div>
        <div class="footer-section">
            <h4>Atendimento</h4>
            <p>Rua das Patinhas, 123</p>
            <p>São Paulo - SP</p>
        </div>
    `;
}
