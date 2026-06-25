// ======== MENU MOBILE ========

// seleciona os elementos do menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.navbar ul');
const btnClose = document.querySelector('.btn-close-menu');

// abre/fecha o menu ao clicar no ícone hambúrguer
hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('menu-open');
});

// fecha o menu ao clicar no botão X
btnClose.addEventListener('click', function() {
    navLinks.classList.remove('menu-open');
});

// desativa a animação e fecha o menu durante o redimensionamento da janela
let resizeTimer;
window.addEventListener('resize', function() {
    navLinks.classList.add('no-transition');
    navLinks.classList.remove('menu-open');
    clearTimeout(resizeTimer); // cancela o timer anterior
    resizeTimer = setTimeout(function() {
        navLinks.classList.remove('no-transition'); // reativa a animação após 300ms
    }, 300);
});

// fecha o menu ao clicar fora dele
document.addEventListener('click', function(event) {
    const clickDentroMenu = navLinks.contains(event.target);
    const clickNoHamburguer = hamburger.contains(event.target);

    // só fecha se o clique foi fora do menu e fora do hambúrguer
    if (!clickDentroMenu && !clickNoHamburguer) {
        navLinks.classList.remove('menu-open');
    }
});