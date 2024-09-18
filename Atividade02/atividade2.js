// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({ id, nome, valor, quantidade });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho(); // Atualiza a exibição
}

// Função para remover um produto específico pelo índice
function removerProduto(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Remove o produto com base no índice
    carrinho.splice(index, 1);

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a exibição
    exibirCarrinho();
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho.length > 0) {
        carrinho.forEach((produto, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${produto.valor.toFixed(2)}
                <button onclick="removerProduto(${index})">Remover</button>
            `;
            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

// Função para adicionar produtos com formulário
function adicionarPorFormulario() {
    const id = document.getElementById('id').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);

    adicionarProduto(id, nome, valor, quantidade); 
}


exibirCarrinho();
