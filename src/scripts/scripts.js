document.addEventListener("DOMContentLoaded", function () {
  const abrirCarrinho = document.getElementById("abrir-carrinho");
  const fecharCarrinho = document.getElementById("cancelar");
  const carrinho = document.getElementById("carrinho");
  const overlay = document.getElementById("overlay");
  const itensCarrinho = document.getElementById("itens-carrinho");
  const botaoAdicionarItens = document.querySelectorAll(".add-product-cart");
  let totalCarrinho = 0;
  const carrinhoItems = {};
  let data = new Date();
  let hora = data.getHours();
  const fechamentoEstabelecimento = document.getElementById("funcionamento");
  const funcionamentoAlert = document.querySelector("header p");

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

    // Remover todos os itens do mesmo tipo
    delete carrinhoItems[produtoNome];

    // Remover o elemento HTML correspondente
    document
      .querySelectorAll(`#carrinho [data-produto="${produtoNome}"]`)
      .forEach((element) => element.remove());

    totalCarrinho = Math.max(totalCarrinho, 0);

    atualizarTotalCarrinho();
    validarCarrinhoVazio();
  }

  function atualizarTotalCarrinho() {
    const totalElement = document.getElementById("total");
    const totalFormatado = totalCarrinho.toFixed(2).replace(".", ",");
    totalElement.textContent = totalFormatado;

    atualizarQuantidadeProdutosCarrinho();
  }

  function validarCarrinhoVazio() {
    const alertaCarrinho = document.getElementById("alerta");
    const itensCarrinho = document.getElementById("itens-carrinho");
    const localizacao = document.getElementById("localizacao");
    const botaoFinalizarCompra = document.getElementById("finalizar");

    // console.log(inputSearch, botaoFinalizarCompra);

    if (Object.keys(carrinhoItems).length === 0) {
      alertaCarrinho.style.display = "flex";
      itensCarrinho.style.display = "none";

      localizacao.disabled = true;
      botaoFinalizarCompra.disabled = true;

      botaoFinalizarCompra.style.background = "var(--color-gray)";

      localizacao.style.cursor = "not-allowed";
      botaoFinalizarCompra.style.cursor = "not-allowed";
    } else {
      alertaCarrinho.style.display = "none";
      itensCarrinho.style.display = "block";

      localizacao.disabled = false;
      botaoFinalizarCompra.disabled = false;

      botaoFinalizarCompra.style.background = "var(--color-green)";

      localizacao.style.cursor = "pointer";
      botaoFinalizarCompra.style.cursor = "pointer";
    }
  }

  function atualizarQuantidadeProdutosCarrinho() {
    const quantidadeProdutosCarrinhoSpan = document.getElementById(
      "quantidade-produtos-carrinho"
    );
    let totalProdutos = 0;

    // Percorre os itens no carrinho e soma suas quantidades
    for (const produto in carrinhoItems) {
      totalProdutos += carrinhoItems[produto].quantidade;
    }

    // Atualiza o texto do span com a quantidade total de produtos no carrinho
    quantidadeProdutosCarrinhoSpan.textContent = totalProdutos;
  }

  function horarioDeFuncionamneto() {
    if (hora >= 7 && hora < 17) {
      fechamentoEstabelecimento.textContent = "aberto";
      funcionamentoAlert.style.background = "var(--color-green)";
    } else {
      fechamentoEstabelecimento.textContent = "fechado";
      funcionamentoAlert.style.background = "var(--color-red)";
    }
  }

  atualizarQuantidadeProdutosCarrinho();
  validarCarrinhoVazio();
  horarioDeFuncionamneto();
});
