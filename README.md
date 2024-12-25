# Programentes: Um guia para Iniciantes em Programação!
Este projeto é um Guia para Iniciantes em Programação que visa facilitar a jornada de quem está começando no mundo da programação. O guia reúne artigos, vídeos e recursos sobre temas fundamentais, como lógica de programação, linguagens mais populares e a importância de ferramentas como Git e GitHub. O projeto foi construído usando HTML, CSS, e JavaScript para criar uma interface dinâmica e interativa. 

[Acesse ele aqui!](https://mathmorgado.github.io/Projeto-Imersao-Dev-Alura/)

## 🛠️ Tecnologias Utilizadas
**HTML5**: Estrutura do conteúdo do site. 

**CSS3**: Estilização e layout responsivo.

**JavaScript**: Implementação da funcionalidade de pesquisa, filtro por categorias e interação com a interface.

## ⚙️ Funcionalidades Principais
1. Pesquisa Dinâmica: O usuário pode pesquisar por palavras-chave que vão filtrar os artigos disponíveis no guia.
  - Quando o campo de pesquisa está vazio, o layout volta ao estado inicial com 3 cards para cada categoria.
  - A pesquisa ajusta automaticamente o layout dos resultados para uma exibição em linha.
Trecho do código da pesquisa:

```javascript
document.querySelector('.SeachBox input').addEventListener('keyup', function (e) {
    let query = e.target.value.toLowerCase();

    if (query === "") {
        initialState();
    } else if (e.key === 'Enter') {
        searchResults(query);
        document.querySelector('.resultsContainer').style.flexDirection = 'row';
    }
});
```

2. Filtros por Categoria: O site possui três categorias principais:
 - Guia
 - Cursos
 - Tecnologias
Cada uma exibe 3 artigos selecionados, e ao clicar em uma categoria, os outros botões de filtro ficam cinza, destacando apenas a categoria selecionada.

Exemplo de filtro por categoria:

```javascript
function filterByCategory(category) {
    let results = [];
    if (category === 'guia') results = dbGuia;
    else if (category === 'cursos') results = dbCursos;
    else if (category === 'tecnologia') results = dbTecnologia;

    displaySearchResults(results);
}
```

3. Layout Dinâmico: Dependendo da ação do usuário (pesquisa ou filtro), o layout da exibição dos artigos muda entre coluna e linha automaticamente, proporcionando uma melhor experiência visual.

Ajuste dinâmico de layout:

```javascript
let resultsContainer = document.querySelector('.resultsContainer');
resultsContainer.style.flexDirection = 'row';
```

4. Base de Dados Local: O site utiliza uma base de dados local em formato JSON que contém informações como título, descrição, link e imagem de cada artigo. Aqui está um exemplo da estrutura usada:

```javascript
let dbGuia = [
    {
        titulo: "Por que estudar programação?",
        descricao: "Entenda a importância da programação no mundo moderno...",
        link: "https://www.digitalhouse.com/br/blog/por-que-estudar-programacao",
        imagem: "images/programacaaao.jpg"
    },
    ...
];
```

## 📝 Estrutura de Código
1. HTML
- A estrutura do site é simples, com uma barra de pesquisa, botões de filtro por categoria e uma seção para exibição dos artigos.
Exemplo do HTML básico:

```html
<div class="SeachBox">
    <input type="text" placeholder="Pesquisar...">
</div>
<div class="btnContainer">
    <button class="btnCategoria">Guia</button>
    <button class="btnCategoria">Cursos</button>
    <button class="btnCategoria">Tecnologias</button>
</div>
<div class="resultsContainer"></div>
```

2. CSS
- O CSS define a aparência da página, tornando o layout responsivo e utilizando o flexbox para organizar os elementos.
Estilização Flexbox:

```css
.resultsContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
```
3. JavaScript
- O JavaScript gerencia toda a lógica do site: pesquisa, filtros, exibição de dados e mudança de layout.
Exibição inicial dos dados:

```javascript
function initialState() {
    let resultsContainer = document.querySelector('.resultsContainer');
    resultsContainer.innerHTML = `
        <div class="itemSection">
            <h3>Guia</h3>
            <div id="GuiaSection" class="itemBox"></div>
        </div>
        ...
    `;
    resultsContainer.style.flexDirection = 'column';

    // Populando os dados
    getDatas(dbGuia, '', document.getElementById("GuiaSection"));
    getDatas(dbCursos, '', document.getElementById("CursosSection"));
    getDatas(dbTecnologia, '', document.getElementById("TecnologiasSection"));
}
```

## 📑 Como Usar
Clone o repositório:

```bash
git clone https://github.com/mathmorgado/Projeto-Imersao-Dev-Alura.git
```
Abra o arquivo index.html no navegador.

---
Com esse projeto, espero ajudar quem está começando a entender os fundamentos da programação e as diferentes áreas que podem explorar. Fique à vontade para explorar o código, sugerir melhorias e contribuir com o repositório!
