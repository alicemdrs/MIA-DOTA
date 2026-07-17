function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function getPetSpecies(pet) {
    return (pet.especie || pet.species || '').toLowerCase();
}

function matchesSpeciesFilter(pet, filterValue) {
    if (filterValue === 'TODOS') return true;

    const especie = getPetSpecies(pet);
    const filter = filterValue.toLowerCase();

    if (filter === 'cão' || filter === 'cao') {
        return especie === 'cão' || especie === 'cao' || especie === 'cachorro';
    }

    return especie === filter;
}

function getPetImage(pet) {
    const existing = pet.fotoUrl || pet.photoUrl;
    if (existing) return existing;

    const especie = getPetSpecies(pet);
    const sexo = (pet.sexo || pet.gender || '').toLowerCase();
    const isFemale = sexo === 'fêmea' || sexo === 'femea';

    if (especie === 'gato') {
        return isFemale
            ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300'
            : 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=300';
    }

    return isFemale
        ? 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=300'
        : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300';
}

function formatVisitDate(dateStr) {
    if (!dateStr) return 'Data inválida';
    return dateStr.split('-').reverse().join('/');
}
