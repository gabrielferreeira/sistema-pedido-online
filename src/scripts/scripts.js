document.addEventListener("DOMContentLoaded", function () {
  const abrirCarrinho = document.getElementById("abrir-carrinho");
  const fecharCarrinho = document.getElementById("cancelar");
  const carrinho = document.getElementById("carrinho");
  const overlay = document.getElementById("overlay");
  const itensCarrinho = document.getElementById("itens-carrinho");
  const botaoAdicionarItens = document.querySelectorAll(".add-product-cart");
  let totalCarrinho = 0;
  const carrinhoItems = {};

  botaoAdicionarItens.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productIndex = btn.getAttribute("data-product-index");
      const itemIndex = btn.getAttribute("data-item-index");
      adicionarAoCarrinho(productIndex, itemIndex);
    });
  });

  abrirCarrinho.addEventListener("click", () => {
    carrinho.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";

    atualizarTotalCarrinho();
  });

  fecharCarrinho.addEventListener("click", () => {
    fecharCarrinhoCliqueOverlay();
  });

  overlay.addEventListener("click", () => {
    fecharCarrinhoCliqueOverlay();
  });

  function fecharCarrinhoCliqueOverlay() {
    carrinho.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function adicionarAoCarrinho(productIndex, itemIndex) {
    const produto = produtos[productIndex].itens[itemIndex];
    totalCarrinho += produto.preco;

    // Verifica se o produto já está no carrinho
    if (carrinhoItems[produto.nome]) {
      carrinhoItems[produto.nome].quantidade++;
      // Atualiza a quantidade do produto no HTML
      document.querySelector(
        `#carrinho [data-produto="${produto.nome}"] .quantidade-produto`
      ).textContent = carrinhoItems[produto.nome].quantidade;
    } else {
      // Adiciona o produto ao carrinho
      carrinhoItems[produto.nome] = {
        preco: produto.preco,
        quantidade: 1,
      };

      // Adiciona o produto ao HTML
      const produtoNovo = document.createElement("div");
      produtoNovo.classList.add("produtos-carrinho");
      produtoNovo.setAttribute("data-produto", produto.nome); // Adiciona um atributo para identificar o produto
      produtoNovo.innerHTML = `
            <img
              src="${produto.img}"
              alt="${produto.textoAlternativo}"
              title="${produto.titleImagem}"
            />
            <div class="produtos-carrinho-text">
              <h2>${produto.nome}</h2>
              <p>Itens: <span class="quantidade-produto">1</span></p>
            </div>
            <button class="remover"><i class="bi bi-trash"></i></button>
      `;
      itensCarrinho.appendChild(produtoNovo);
      produtoNovo
        .querySelector(".remover")
        .addEventListener("click", () =>
          removerProdutosDoCarrinho(produto.nome, produto.preco)
        );
    }

    atualizarTotalCarrinho();
    validarCarrinhoVazio();
  }

  function removerProdutosDoCarrinho(produtoNome, precoProduto) {
    totalCarrinho -= precoProduto * carrinhoItems[produtoNome].quantidade;

    carrinhoItems[produtoNome].quantidade--;

    // Se a quantidade do produto no carrinho for 0, remove o produto do carrinho
    if (carrinhoItems[produtoNome].quantidade === 0) {
      delete carrinhoItems[produtoNome];
      document
        .querySelector(`#carrinho [data-produto="${produtoNome}"]`)
        .remove();
    } else {
      // Atualiza a quantidade do produto no HTML
      document.querySelector(
        `#carrinho [data-produto="${produtoNome}"] .quantidade-produto`
      ).textContent = carrinhoItems[produtoNome].quantidade;
    }

    totalCarrinho = Math.max(totalCarrinho, 0);

    atualizarTotalCarrinho();
    validarCarrinhoVazio();
  }

  function atualizarTotalCarrinho() {
    const totalElement = document.getElementById("total");
    const totalFormatado = totalCarrinho.toFixed(2).replace(".", ",");
    totalElement.textContent = totalFormatado;
  }

  function validarCarrinhoVazio() {
    const alertaCarrinho = document.getElementById("alerta");
    const itensCarrinho = document.getElementById("itens-carrinho");

    if (Object.keys(carrinhoItems).length === 0) {
      alertaCarrinho.style.display = "flex";
      itensCarrinho.style.display = "none";
    } else {
      alertaCarrinho.style.display = "none";
      itensCarrinho.style.display = "block";
    }
  }

  validarCarrinhoVazio();
});
