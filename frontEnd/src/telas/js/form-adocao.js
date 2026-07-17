const urlParams = new URLSearchParams(window.location.search);
const petId = urlParams.get('petId');
const petNome = decodeURIComponent(urlParams.get('petNome') || 'este pet');

window.onload = function () {
    document.getElementById('petNameDisplay').innerText = petNome;
};

async function enviarSolicitacao(event) {
    event.preventDefault();

    const dadosPedido = {
        animalId: petId,
        petNome: petNome,
        nomeAdotante: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        endereco: document.getElementById('endereco').value.trim(),
        justification: document.getElementById('motivo').value.trim(),
        dataPedido: new Date(),
    };

    const token = localStorage.getItem('token');

    if (token === 'mock-jwt-token-adotante' || !petId) {
        alert('Pedido enviado com sucesso!\n\nAguarde informações no seu e-mail.');
        window.location.href = 'vitrineScreen.html';
        return;
    }

    try {
        const res = await fetch(`${API_URL}/adoptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dadosPedido),
        });

        if (res.ok) {
            alert('Pedido enviado com sucesso!\n\nAguarde informações no seu e-mail.');
            window.location.href = 'vitrineScreen.html';
        } else {
            const err = await res.json();
            alert(`Erro ao processar envio: ${err.message}`);
        }
    } catch (e) {
        alert('Pedido enviado com sucesso! (Simulação ativa)\n\nAguarde informações no seu e-mail.');
        window.location.href = 'vitrineScreen.html';
    }
}
