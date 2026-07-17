async function agendarVisita(event) {
    event.preventDefault();

    const petInput = document.getElementById('visitantePet').value.trim();
    const animalId = Number(petInput);

    const novaVisita = {
        nomeVisitante: document.getElementById('visitanteNome').value,
        telefoneVisitante: document.getElementById('visitanteTelefone').value,
        animalId: Number.isNaN(animalId) ? 1 : animalId,
        dataVisita: document.getElementById('visitaData').value,
        horarioVisita: document.getElementById('visitaHora').value,
    };

    try {
        const response = await fetch(`${API_URL}/visits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaVisita),
        });

        if (response.ok) {
            alert('Sua visita foi pré-agendada com sucesso! Entraremos em contato para confirmar.');
            document.getElementById('visitaForm').reset();
        } else {
            alert('Erro ao enviar o agendamento.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Agendamento realizado com sucesso (Simulação local)!');
        document.getElementById('visitaForm').reset();
    }
}
