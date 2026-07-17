const mockPedidos = [
    {
        _id: '101',
        petNome: 'Pipoca',
        nomeAdotante: 'João Silva',
        email: 'joao@email.com',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123 - SP',
        justificativa: 'Tenho uma casa grande com quintal e adoro cães!',
    },
    {
        _id: '102',
        petNome: 'Mingau',
        nomeAdotante: 'Beatriz Costa',
        email: 'beatriz@email.com',
        telefone: '11988888888',
        endereco: 'Av. Paulista, 1000 - SP',
        justificativa: 'Procuro um companheiro calmo para meu apartamento.',
    },
];

window.addEventListener('DOMContentLoaded', () => {
    carregarPedidos();
});

async function carregarPedidos() {
    const container = document.getElementById('pedidosContainer');
    container.innerHTML = '';

    try {
        const response = await fetch(`${API_URL}/adoptions`);
        if (response.ok) {
            const pedidos = await response.json();
            if (pedidos.length === 0) {
                container.innerHTML = '<p class="empty-message">Nenhum pedido recebido ainda.</p>';
                return;
            }
            pedidos.forEach((pedido) => renderizarCardPedido(pedido, container));
        } else {
            usarMockPedidos(container);
        }
    } catch (error) {
        console.warn('Usando dados mockados de pedidos (API Offline).');
        usarMockPedidos(container);
    }
}

function usarMockPedidos(container) {
    container.innerHTML = '';
    mockPedidos.forEach((pedido) => renderizarCardPedido(pedido, container));
}

function renderizarCardPedido(pedido, container) {
    const card = document.createElement('div');
    card.className = 'pedido-card';
    card.innerHTML = `
        <div class="pedido-header">
            <h3>Adotante: ${pedido.nomeAdotante}</h3>
            <span class="pet-tag">Interesse: ${pedido.animalId || pedido.petNome || '—'}</span>
        </div>
        <div class="pedido-info">
            <p><strong>E-mail:</strong> ${pedido.email}</p>
            <p><strong>Telefone:</strong> ${pedido.telefone}</p>
            <p><strong>Endereço:</strong> ${pedido.endereco}</p>
        </div>
        <div class="pedido-justificativa">
            <strong>Por que quero adotar:</strong><br>
            "${pedido.justificativa || pedido.justification || 'Não informada'}"
        </div>
        <div class="pedido-actions">
            <button class="btn-action btn-approve" onclick="aprovarPedido('${pedido.id || pedido._id}')">Aprovar Pedido</button>
        </div>
    `;
    container.appendChild(card);
}

function aprovarPedido(id) {
    alert(`Pedido ${id} aprovado com sucesso!`);
}

function handleLogout() {
    alert('Sessão encerrada.');
    window.location.href = 'index.html';
}
