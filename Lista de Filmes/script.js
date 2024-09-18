// Criando a base de dados de filmes  
const filmes = [
    {
        id: 0,
        nome: 'Harry Potter',
        genero: 'fantasia',
        lancamento: 2001
    },
    {
        id: 1,
        nome: 'Avatar',
        genero: 'fantasia',
        lancamento: 2010
    },
    {
        id: 2,
        nome: 'O senhor dos Anéis',
        genero: 'fantasia',
        lancamento: 2000,
    },
    {
        id: 3,
        nome: 'Branquelas',
        genero: 'comédia',
        lancamento: 2007
    },
    {
        id: 4,
        nome: 'A Lagoa Azul',
        genero: 'romance',
        lancamento: 1983
    }
];

// Criando um array de filmes favoritos
let filmesFavoritos = [];

// Pegando Elementos HTML

// Pega o elemento button
const btn1 = document.querySelector('button');
// Pega a lista de filmes
const listaFilmes = document.querySelector('#listaFilmes');

// Ao carregar a página, executa a função que renderiza os elementos na tela
window.onload = () => {
    renderizarLista();
};

// Função para renderizar filmes na tela
const renderizarLista = () => {
    // Limpa a tela antes de renderizar
    listaFilmes.innerHTML = "";
    // Percorre o array de filmes, inserindo um li com o nome do filme a cada volta do loop
    filmes.forEach((filme) => {
        const itemLista = document.createElement('li');
        // Adiciona o li à lista de filmes
        listaFilmes.append(itemLista);
        // Adiciona o nome do filme
        itemLista.innerHTML = `Meu filme ${filme.nome}`;
        
        // Cria uma nova imagem
        const favorito = document.createElement('img');
        // Define o estado do coração (favorito ou não)
        favorito.src = verificarFavoritos(filme.id) ? 'img/heart-fill.svg' : 'img/heart.svg';
        // Muda o cursor da imagem para mãozinha de clique
        favorito.style.cursor = 'pointer';
        // Adiciona evento de clique à imagem
        favorito.addEventListener('click', (e) => {
            favoritoClicado(e, filme);
        });
        // Adiciona a imagem ao item da lista
        itemLista.append(favorito);
    });
};

// Função para verificar se o filme está no array de favoritos no localStorage
const verificarFavoritos = (id) => {
    // Carrega os filmes favoritos do localStorage
    if (localStorage.getItem('favoritos')) {
        filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
        // Verifica se o filme com o ID especifico está na lista de favoritos
        return filmesFavoritos.some((filme) => filme.id === id);
    }
    return false;
};

// Adiciona o evento de clique ao botão
btn1.addEventListener('click', () => {
    // Pega o input onde o usuário digita o filme
    const inputUsuario = document.querySelector('#filmeInput');
    // Adiciona um id ao filme, considerando que o tamanho do array será sempre um a mais que seu index
    let id = filmes.length;
    // Adiciona o valor à propriedade nome do objeto dentro do array filmes
    filmes.push({ id: id, nome: inputUsuario.value, genero: '', lancamento: '' });
    console.log(filmes);
    // Renderiza a lista novamente
    renderizarLista();
    // Apaga o campo de digitação
    inputUsuario.value = '';
});

// Função que é executada quando o botão de favorito é clicado
const favoritoClicado = (eventoDeClique, objetoFilme) => {
    // Define o estado do ícone favorito e não favorito
    const favoriteState = {
        favorited: 'img/heart-fill.svg',
        notFavorited: 'img/heart.svg',
    };
    // Valida se o src da imagem que foi clicada inclui o caminho da imagem de não favoritado
    if (eventoDeClique.target.src.includes(favoriteState.notFavorited)) {
        // Se incluir, mudar a imagem para favoritado e executar a função de salvar no localStorage
        eventoDeClique.target.src = favoriteState.favorited;
        saveToLocalStorage(objetoFilme);
    } else {
        // Senão, manter a imagem de não favoritado e executar a função de remover do localStorage
        eventoDeClique.target.src = favoriteState.notFavorited;
        removeFromLocalStorage(objetoFilme.id);
    }
};

// Função executada para salvar o filme no localStorage
const saveToLocalStorage = (objetoFilme) => {
    // Checa se já existe um campo de favoritos no LocalStorage
    if (localStorage.getItem('favoritos')) {
        filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
    }
    // Adiciona o nome do Filme ao array filmesFavoritos
    filmesFavoritos.push(objetoFilme);
    // Transforma o array em string para poder salvar no LocalStorage
    const moviesJSON = JSON.stringify(filmesFavoritos);
    // Salva no localStorage
    localStorage.setItem('favoritos', moviesJSON);
};

// Função executada para remover o filme no localStorage
function removeFromLocalStorage(id) {
    // Checa se já existe um campo de favoritos no LocalStorage
    if (localStorage.getItem('favoritos')) {
        filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
    }
    // Procura no array o id do filme
    const procurarFilme = filmesFavoritos.find(movie => movie.id === id);
    // Filtra todos os filmes que tem o id diferente do que foi encontrado e gera um novo array
    const filmesFiltrados = filmesFavoritos.filter(movie => movie.id != procurarFilme.id);
    // Transforma o array em string para poder salvar no LocalStorage
    const filmesFiltradosJSON = JSON.stringify(filmesFiltrados);
    // Guarda esse novo array no localStorage
    localStorage.setItem('favoritos', filmesFiltradosJSON);
}
