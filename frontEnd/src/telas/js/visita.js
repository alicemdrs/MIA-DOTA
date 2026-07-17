let visitasArr = [
    {
        id: 1,
        nomeVisitante: 'João Silva',
        telefoneVisitante: '1234567890',
        animalId: 1,
        dataVisita: '2023-06-01',
        horarioVisita: '10:00',
        status: 'pendente',
    },
    {
        id: 2,
        nomeVisitante: 'Maria Souza',
        telefoneVisitante: '0987654321',
        animalId: 2,
        dataVisita: '2023-06-02',
        horarioVisita: '14:00',
        status: 'aprovado',
    },
];

window.addEventListener('DOMContentLoaded', () => {
    carregarVisitas();
});

async function carregarVisitas() {
    const container = document.getElementById('visitasContainer');
    container.innerHTML = '';

    try {
        const response = await fetch(`${API_URL}/visits`);
        if (response.ok) {
            visitasArr = await response.json();
        }
    } catch (error) {
        console.warn('API offline. Carregando dados de simulação.');
    }

    if (visitasArr.length === 0) {
        container.innerHTML = '<p class="empty-message" style="margin-top: 2rem;">Nenhuma solicitação de visita pendente.</p>';
        return;
    }

    visitasArr.forEach((visit) => {
        let statusClass = 'status-pendente';
        let cardStatusClass = '';
        let statusTexto = 'Pendente';

        if (visit.status === 'aprovado') {
            statusClass = 'status-confirmado';
            cardStatusClass = 'confirmada';
            statusTexto = 'Aprovada';
        } else if (visit.status === 'rejeitado') {
            statusClass = 'status-recusado';
            cardStatusClass = 'recusada';
            statusTexto = 'Rejeitada';
        } else if (visit.status === 'realizada') {
            statusClass = 'status-confirmado';
            cardStatusClass = 'confirmada';
            statusTexto = 'Realizada';
        }

        const dataFormatada = formatVisitDate(visit.dataVisita);

        const card = document.createElement('div');
        card.className = `visita-card ${cardStatusClass}`;
        card.innerHTML = `
            <div class="visita-header">
                <h3>Visitante: ${visit.nomeVisitante}</h3>
                <span class="status-badge ${statusClass}">${statusTexto}</span>
            </div>
            <div class="visita-info">
                <p><strong>ID do Pet:</strong> ${visit.animalId}</p>
                <p><strong>Data Proposta:</strong> ${dataFormatada} às ${visit.horarioVisita}</p>
                <p><strong>Telefone de Contato:</strong> ${visit.telefoneVisitante}</p>
            </div>
            <div class="visita-actions">
                ${visit.status === 'pendente' ? `
                    <button class="btn-action btn-accept" onclick="atualizarStatusVisita(${visit.id}, 'aprovar')">Aprovar Visita</button>
                    <button class="btn-action btn-reject" onclick="atualizarStatusVisita(${visit.id}, 'rejeitar')">Rejeitar</button>
                ` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

async function atualizarStatusVisita(id, acao) {
    try {
        const response = await fetch(`${API_URL}/visits/${id}/${acao}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Visita alterada com sucesso!');
            carregarVisitas();
        } else {
            atualizarLocalmente(id, acao);
        }
    } catch (error) {
        atualizarLocalmente(id, acao);
    }
}

function atualizarLocalmente(id, acao) {
    const visit = visitasArr.find((v) => v.id === id);
    if (visit) {
        visit.status = acao === 'aprovar' ? 'aprovado' : 'rejeitado';
        alert(`Visita atualizada localmente para: ${visit.status}!`);
        carregarVisitas();
    }
}

function handleLogout() {
    alert('Sessão encerrada.');
    window.location.href = 'index.html';
}
