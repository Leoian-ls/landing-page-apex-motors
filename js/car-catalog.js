// ======== FILTRO DO CATÁLOGO ========
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.catalog-grid .car-card');
const catalogCount = document.querySelector('.catalog-count');
const searchInput = document.getElementById('search-input');

// filtros ativos
const filtrosAtivos = {
    marca: 'all',
    preco: 'all',
    tipo: 'all'
};

// descobre o grupo do botão clicado
function getGrupo(btn) {
    const label = btn.closest('.filter-group').querySelector('.filter-label').textContent.toLowerCase();
    if (label === 'marca') return 'marca';
    if (label === 'preço') return 'preco';
    if (label === 'tipo') return 'tipo';
    return null;
}

// atualiza o contador de veículos visíveis
function atualizarContador() {
    const visiveis = document.querySelectorAll('.catalog-grid .car-card:not(.hidden):not(.hidden-search)').length;
    catalogCount.textContent = visiveis + ' veículos encontrados';
}

// aplica os filtros de botão
function aplicarFiltros() {
    cards.forEach(function(card) {
        const marcaOk = filtrosAtivos.marca === 'all' || card.dataset.marca === filtrosAtivos.marca;
        const precoOk = filtrosAtivos.preco === 'all' || card.dataset.preco === filtrosAtivos.preco;
        const tipoOk  = filtrosAtivos.tipo  === 'all' || card.dataset.tipo  === filtrosAtivos.tipo;

        if (marcaOk && precoOk && tipoOk) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    atualizarContador();
}

// clique nos botões de filtro
filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const grupo = getGrupo(btn);
        if (!grupo) return;

        btn.closest('.filter-group').querySelectorAll('.filter-btn').forEach(function(b) {
            b.classList.remove('active');
        });

        btn.classList.add('active');
        filtrosAtivos[grupo] = btn.dataset.filter;
        aplicarFiltros();
    });
});

// ======== ORDENAR POR PREÇO ========
const grid = document.querySelector('.catalog-grid');

document.querySelectorAll('.filter-group').forEach(function(group) {
    const label = group.querySelector('.filter-label').textContent.toLowerCase();
    if (label !== 'ordenar por') return;

    group.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            // atualiza o botão ativo
            group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const texto = btn.textContent.toLowerCase();
            const cardsArray = Array.from(cards);

            if (texto === 'menor preço') {
                cardsArray.sort(function(a, b) {
                    return Number(a.dataset.precoNum) - Number(b.dataset.precoNum);
                });
            } else if (texto === 'maior preço') {
                cardsArray.sort(function(a, b) {
                    return Number(b.dataset.precoNum) - Number(a.dataset.precoNum);
                });
            } else {
                // padrão — volta para a ordem original do HTML
                cardsArray.sort(function(a, b) {
                    return Number(a.dataset.ordem) - Number(b.dataset.ordem);
                });
            }

            cardsArray.forEach(card => grid.appendChild(card));
        });
    });
});

// ======== PESQUISA ========
function aplicarPesquisa() {
    const termo = searchInput.value.toLowerCase().trim();

    cards.forEach(function(card) {
        const marca = card.querySelector('.car-brand').textContent.toLowerCase();
        const modelo = card.querySelector('.car-name').textContent.toLowerCase();

        if (marca.includes(termo) || modelo.includes(termo)) {
            card.classList.remove('hidden-search');
        } else {
            card.classList.add('hidden-search');
        }
    });

    atualizarContador();
}

// clique no botão
document.getElementById('search-btn').addEventListener('click', aplicarPesquisa);

// pressionar Enter
searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        aplicarPesquisa();
    }
});