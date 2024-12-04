const _elements = {
    body: document.querySelector("body"),
    search: document.querySelector("#search"),
    switch: document.querySelector(".switch"),
    selectOptions: document.querySelectorAll(".state-select-list__item"),
    stateCard: document.querySelectorAll(".state-card"),
    cardValue: document.querySelectorAll(".state-card__value"),
    cardTitle: document.querySelectorAll(".state-card__title"),
    chartDonut: document.querySelector("#chart-donut"),
    chartStacked: document.querySelector("#chart-stacked")
};

// TEMA - MODO ESCURO
const switchTrack = document.querySelector('.switch_track');
const body = document.body;

// Adiciona um evento de clique no switch
switchTrack.addEventListener('click', () => {
    // Obtém o tema atual
    const currentTheme = body.getAttribute('data-theme');
    
    // Alterna o tema entre claro e escuro
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
    }
});

// BUSCA - FILTRAR UFS
_elements.search.addEventListener("keyup", (e) => {
    const search = e.target.value.toLowerCase();
    for(const item of _elements.selectOptions) {
        const state = item.innerText.toLowerCase();
        if(state.includes(search)) {
            item.classList.remove("state-select-list__item--hide");
        } else {
            item.classList.add("state-select-list__item--hide");
        }
    }
});

// ATUALIZAR CARDS
function updateCards(ufs) {
    _elements.cardValue.forEach((card, i) => {
        card.innerText = ufs[i].cases.new;
    });
    _elements.cardTitle.forEach((card, i) => {
        card.innerText = ufs[i].state;
    });
}

// REQUEST - OBTER DADOS DA API
async function request(url) {
    const data = await fetch(url);
    const json = await data.json();
    return json;
}

// GRAFICO - DOENÇA
function createDonutChart(data) {
    // Lógica para criar gráfico de rosca (Donut)
    console.log("Criando gráfico de rosca...");
}

// GRAFICO - DOENÇA
function createStackedColumnsChart(data) {
    // Lógica para criar gráfico de colunas empilhadas
    console.log("Criando gráfico de colunas empilhadas...");
}

// INICIALIZAÇÃO
async function init() {
    const ufs = await request("https://api.exemplo.com/ufs");
    updateCards(ufs);
    createDonutChart(ufs);
    createStackedColumnsChart(ufs);
}

init();
