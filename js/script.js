const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.navbar ul');
const btnClose = document.querySelector('.btn-close-menu');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('menu-open');
});

btnClose.addEventListener('click', function() {
    navLinks.classList.remove('menu-open');
});

let resizeTimer;
window.addEventListener('resize', function() {
    navLinks.classList.add('no-transition');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        navLinks.classList.remove('no-transition');
    }, 300);
});

document.addEventListener('click', function(event) {
    const clickDentroMenu = navLinks.contains(event.target);
    const clickNoHamburguer = hamburger.contains(event.target);

    if (!clickDentroMenu && !clickNoHamburguer) {
        navLinks.classList.remove('menu-open');
    }
});