// Exibe os dados de um determinado database em uma estrutura de card
function getDatas(dataBase, TempVar, htmlSection) {
    for (let dado = 0; dado < 3; dado++) {
        TempVar += `
            <a href="${dataBase[dado].link}" target="_blank" class="itemCard">
                <img src="${dataBase[dado].imagem}">
                <div>
                    <h3>${dataBase[dado].titulo}</h3>
                    <p>${dataBase[dado].descricao}</p>
                </div>
            </a>
        `
    }
    
    htmlSection.innerHTML += TempVar;
}

// Função exibir layout com 3 cards de cada categoria
function initialState() {
    // Layout inicial e estilização para flex-direction: column
    let resultsContainer = document.querySelector('.resultsContainer');
    resultsContainer.innerHTML = `
        <div class="itemSection">
            <h3>Guia</h3>
            <div id="GuiaSection" class="itemBox"></div>
        </div>
        <div class="itemSection">
            <h3>Cursos</h3>
            <div id="CursosSection" class="itemBox"></div>
        </div>
        <div class="itemSection" >
            <h3>Tecnologias</h3>
            <div id="TecnologiasSection" class="itemBox"></div>
        </div>
    `;
    resultsContainer.style.flexDirection = 'column';

    let sectionGuia = document.getElementById("GuiaSection");
    let sectionCursos = document.getElementById("CursosSection");
    let sectionTecnologias = document.getElementById("TecnologiasSection");

    sectionGuia.innerHTML = '';
    sectionCursos.innerHTML = '';
    sectionTecnologias.innerHTML = '';

    let dadosGuia = '';
    let dadosCursos = '';
    let dadosTecnologias = '';

    getDatas(dbGuia, dadosGuia, sectionGuia);
    getDatas(dbCursos, dadosCursos, sectionCursos);
    getDatas(dbTecnologia, dadosTecnologias, sectionTecnologias);
}

function displaySearchResults(results) {
    let resultsContainer = document.querySelector('.resultsContainer');
    resultsContainer.innerHTML = ''; // Limpa os resultados anteriores

    results.forEach(result => {
        let item = `
            <a href="${result.link}" target="_blank" class="itemCard">
                <img src="${result.imagem}">
                <div>
                    <h3>${result.titulo}</h3>
                    <p>${result.descricao}</p>
                </div>
            </a>
        `;
        resultsContainer.innerHTML += item;
    });

    // Se não houver resultados
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }
}

function searchResults(query) {
    let results = [];

    // Verifica em cada database se há correspondências com a query
    results.push(...dbGuia.filter(item => item.titulo.toLowerCase().includes(query)));
    results.push(...dbCursos.filter(item => item.titulo.toLowerCase().includes(query)));
    results.push(...dbTecnologia.filter(item => item.titulo.toLowerCase().includes(query)));

    displaySearchResults(results);
}

function filterByCategory(category) {
    let results = [];

    // Filtra os dados de acordo com a categoria clicada
    if (category === 'guia') {
        results = dbGuia;
    } else if (category === 'cursos') {
        results = dbCursos;
    } else if (category === 'tecnologia') {
        results = dbTecnologia;
    }

    displaySearchResults(results);
}

// Função para aplicar cor cinza aos outros botões e manter a cor padrão no botão selecionado
function updateCategoryButtonColors(selectedButton) {
    document.querySelectorAll('.btnCategoria').forEach(button => {
        if (button === selectedButton) {
            button.classList.remove('greyed'); // Cor padrão (remover estilo)
        } else {
            button.classList.add('greyed'); // Aplica a cor cinza
        }
    });
}

// Função para resetar a cor de todos os botões para o estado padrão
function resetCategoryButtonColors() {
    document.querySelectorAll('.btnCategoria').forEach(button => {
        button.classList.remove('greyed'); // Cor padrão (remover estilo)
    });
}

// INICIANDO O PROGRAMA
initialState()

// Variável para armazenar o botão de categoria atualmente selecionado
let selectedCategoryButton = null;

document.querySelectorAll('.btnCategoria').forEach(button => {
    button.addEventListener('click', function () {
        // Se o botão clicado for o mesmo que o botão já selecionado
        if (selectedCategoryButton === this) {
            // Resetar cores e voltar ao estado inicial
            resetCategoryButtonColors();
            initialState(); // Chama a função para resetar o estado inicial
            selectedCategoryButton = null; // Desmarca o botão selecionado
        } else {
            // Marca o botão clicado como o botão selecionado
            selectedCategoryButton = this;

            // Aplica o estilo cinza aos outros botões e mantém o estilo padrão no botão clicado
            updateCategoryButtonColors(this);

            // Chama a função para exibir a categoria selecionada
            let category = this.innerText.toLowerCase();
            filterByCategory(category);

            // Mudar a estilização para flex-direction: row
            let resultsContainer = document.querySelector('.resultsContainer');
            resultsContainer.style.flexDirection = 'row';
        }
    });
});

// PESQUISA
document.querySelector('.SeachBox input').addEventListener('keyup', function (e) {
    let query = e.target.value.toLowerCase();

    if (query === "") {
        // Se o campo de pesquisa estiver vazio, volta para o estado original
        initialState();
    } else if (e.key === 'Enter') {
        searchResults(query);

        // Mudar a estilização para flex-direction: row ao realizar a pesquisa
        let resultsContainer = document.querySelector('.resultsContainer');
        resultsContainer.style.flexDirection = 'row';
    }
});