const MOCK_CREDENTIALS = {
    adotante: { token: 'mock-jwt-token-adotante', redirect: 'vitrineScreen.html', role: 'adotante' },
    ong: { token: 'mock-jwt-token-ong', redirect: 'PainelScreen.html', role: 'ong' },
};

const hints = {
    adotante: '<strong>Adotante:</strong> use qualquer e-mail e senha para acessar a vitrine de pets.',
    ong: '<strong>ONG:</strong> use qualquer e-mail e senha para acessar o painel administrativo.',
};

let selectedProfile = 'adotante';

const profileTabs = document.querySelectorAll('.profile-tab');
const hintBox = document.getElementById('hintBox');
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
const btnLogin = document.getElementById('btnLogin');
const guestLink = document.getElementById('guestLink');

profileTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        selectedProfile = tab.dataset.profile;
        profileTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        hintBox.innerHTML = hints[selectedProfile];
        guestLink.style.display = selectedProfile === 'adotante' ? 'block' : 'none';
        errorMsg.classList.remove('visible');
    });
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    errorMsg.classList.remove('visible');

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) {
        errorMsg.textContent = 'Preencha e-mail e senha para continuar.';
        errorMsg.classList.add('visible');
        return;
    }

    btnLogin.disabled = true;
    btnLogin.textContent = 'Entrando...';

    const config = MOCK_CREDENTIALS[selectedProfile];

    setTimeout(() => {
        localStorage.setItem('token', config.token);
        localStorage.setItem('userRole', config.role);
        localStorage.setItem('userEmail', email);
        window.location.href = config.redirect;
    }, 600);
});
