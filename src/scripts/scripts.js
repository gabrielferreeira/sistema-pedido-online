document.addEventListener("DOMContentLoaded", function () {
  const abrirCarrinho = document.getElementById("abrir-carrinho");
  const fecharCarrinho = document.getElementById("cancelar");
  const carrinho = document.getElementById("carrinho");
  const overlay = document.getElementById("overlay");
  const itensCarrinho = document.getElementById("itens-carrinho");
  const botaoAdicionarItens = document.querySelectorAll(".add-product-cart");

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

    const produtoNovo = document.createElement("div");
    produtoNovo.classList.add("produtos-carrinho");
    produtoNovo.innerHTML = `
            <img
              src="${produto.img}"
              alt="${produto.textoAlternativo}"
              title="${produto.titleImagem}"
            />
            <div class="produtos-carrinho-text">
              <h2>${produto.nome}</h2>
              <p>Itens: <span id="quantidade-itens-carrinho">1</span></p>
            </div>
            <button class="remover"><i class="bi bi-trash"></i></button>
      `;
    itensCarrinho.appendChild(produtoNovo);
    produtoNovo
      .querySelector(".remover")
      .addEventListener("click", () => removerProdutosDoCarrinho(produtoNovo));
  }

  function removerProdutosDoCarrinho(produtoNovo) {
    produtoNovo.remove();
  }
});
