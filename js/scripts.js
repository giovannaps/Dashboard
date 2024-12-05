const apiUrl = 'https://parseapi.back4app.com/classes/Classedoback4app'; //Falta substituir a classe 
const headers = {'Content-Type': 'application/json', 'X-Parse-Application-Id': 'HRhl71kGVyIMAN2nMHAaXlTD3WBtpizITlbP5Qxn', 'X-Parse-REST-API-Key':
    'e7LnHDF8sRFdNGVGijHevQ5XmrfCMd4O4xUfELE6' };

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
// Função para criar dados
async function createData() {
    const date = document.getElementById('date').value;
    const cases = document.getElementById('cases').value;
    const deaths = document.getElementById('deaths').value;
    const recovered = document.getElementById('recovered').value;

  if (!validarDados(date, cases, deaths, recovered)) { return; 
   } const data = { date, confirmedCases: cases, deaths, recovered }; 
    try { const response = await fetch(apiUrl, { method: 'POST', headers, body: JSON.stringify(data) }); 
         const result = await response.json();
         exibirMensagem('Dados criados com sucesso!', 'sucesso'); 
         console.log(result); readData(); } catch (error) { 
        exibirMensagem('Erro ao criar dados!', 'erro'); 
        console.error('Erro ao criar dados:', error);
    }  
}
    const data = { date, confirmedCases: cases, deaths, recovered };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        const result = await response.json();
        exibirMensagem('Dados criados com sucesso!', 'sucesso');
        console.log(result);
        readData();
    } catch (error) {
        exibirMensagem('Erro ao criar dados!', 'erro');
        console.error('Erro ao criar dados:', error);
    }
}

// Função para ler dados
async function readData() {
    try {
        const response = await fetch(apiUrl, { headers });
        const data = await response.json();
        console.log(data);
        updateCards(data.results);
        createDonutChart(data.results);
        createStackedColumnsChart(data.results);
    } catch (error) {
        exibirMensagem('Erro ao ler dados!', 'erro');
        console.error('Erro ao ler dados:', error);
    }
}

// Função para atualizar dados
async function updateData(id, updatedData) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updatedData)
        });
        const result = await response.json();
        exibirMensagem('Dados atualizados com sucesso!', 'sucesso');
        console.log(result);
        readData(); 
    } catch (error) {
        exibirMensagem('Erro ao atualizar dados!', 'erro');
        console.error('Erro ao atualizar dados:', error);
    }
}

// Função para deletar dados
async function deleteData(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
            headers
        });
        const result = await response.json();
        exibirMensagem('Dados deletados com sucesso!', 'sucesso');
        console.log(result);
        readData();
    } catch (error) {
        exibirMensagem('Erro ao deletar dados!', 'erro');
        console.error('Erro ao deletar dados:', error);
    }
}


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
