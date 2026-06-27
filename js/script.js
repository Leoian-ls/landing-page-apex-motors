// ======== MENU MOBILE ========

// seleciona os elementos do menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.navbar ul');
const btnClose = document.querySelector('.btn-close-menu');
const carImg = document.querySelector('.car-img img');

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


//
// ======== SLIDER DOS CARDS ========

// pega TODOS os sliders da página
const cardSliders = document.querySelectorAll('.car-img-slider');

// para cada slider, configura independentemente
cardSliders.forEach(function(slider) {

    // pega os elementos DENTRO desse slider específico
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const btnPrev = slider.querySelector('.slider-prev');
    const btnNext = slider.querySelector('.slider-next');
    let currentIndex = 0;

    // mostra o primeiro slide
    slides[0].classList.add('active');

    function updateSlider() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    btnNext.addEventListener('click', function(event) {
        event.stopPropagation(); // evita fechar o menu ao clicar
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    btnPrev.addEventListener('click', function(event) {
        event.stopPropagation(); // evita fechar o menu ao clicar
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function(event) {
            event.stopPropagation();
            currentIndex = index;
            updateSlider();
        });
    });
});