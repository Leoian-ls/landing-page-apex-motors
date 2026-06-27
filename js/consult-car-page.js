// ======== LIGHTBOX ========
const lightbox = document.getElementById('lightbox');

// pega as imagens da galeria oculta do HTML
const galleryImgs = document.querySelectorAll('.car-gallery img');
const carImages = Array.from(galleryImgs).map(img => img.src);

let currentIndex = 0;

const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCurrent = document.querySelector('.lightbox-current');
const lightboxTotal = document.querySelector('.lightbox-total');

// atualiza imagem e contador
function updateLightbox() {
    lightboxImg.src = carImages[currentIndex];
    lightboxCurrent.textContent = currentIndex + 1;
    lightboxTotal.textContent = carImages.length;
}

// abre o lightbox
document.querySelector('.btn-fullscreen').addEventListener('click', function() {
    currentIndex = 0;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// fecha pelo botão X
document.querySelector('.lightbox-close').addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

// fecha clicando no overlay
document.querySelector('.lightbox-overlay').addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

// seta anterior
document.querySelector('.lightbox-prev').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + carImages.length) % carImages.length;
    updateLightbox();
});

// seta próxima
document.querySelector('.lightbox-next').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % carImages.length;
    updateLightbox();
});

// fecha com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % carImages.length;
        updateLightbox();
    }
    if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + carImages.length) % carImages.length;
        updateLightbox();
    }
});

// ======== SLIDER HERO ========
const slides = document.querySelectorAll('.car-hero-slider .slide');
const dots = document.querySelectorAll('.slider-dots .dot');
let slideIndex = 0;

// atualiza slide e bolinha ativa
function updateSlider() {
    // remove active de todos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // adiciona active no atual
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

// botão próximo
document.querySelector('.slider-next').addEventListener('click', function() {
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlider();
});

// botão anterior
document.querySelector('.slider-prev').addEventListener('click', function() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    updateSlider();
});

// clique nas bolinhas
dots.forEach(function(dot, index) {
    dot.addEventListener('click', function() {
        slideIndex = index;
        updateSlider();
    });
});