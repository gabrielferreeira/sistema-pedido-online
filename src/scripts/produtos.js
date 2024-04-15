let produtos = [
  {
    title: "Hambúrguers",
    itens: [
      {
        img: "src/image/burguer.svg",
        textoAlternativo: "Burguer Duplo",
        titleImagem: "Burguer Duplo",
        nome: "Burguer Duplo",
        descricao:
          "Pão brioche, 2 blands 90g, alface, tomate, bacon e molho da casa.",
        preco: 29.9,
      },

      {
        img: "src/image/classico.svg",
        textoAlternativo: "Hambúrguer Clássico",
        titleImagem: "Hambúrguer Clássico",
        nome: "Hambúrguer Clássico",
        descricao:
          "Pão brioche, 1 blands 100g, alface, tomate, queijo cheddar e molho da casa.",
        preco: 16.9,
      },

      {
        img: "src/image/classico-gourmet.svg",
        textoAlternativo: "Hambúrguer Clássico Gourmet",
        titleImagem: "Hambúrguer Clássico Gourmet",
        nome: "Hambúrguer Clássico Gourmet",
        descricao:
          "Pão brioche, bland 100g, alface crespa, cebola roxa, ovo gema mole e molho da casa.",
        preco: 19.9,
      },

      {
        img: "src/image/combo-chicken.svg",
        textoAlternativo: "Combo Clássico",
        titleImagem: "Combo Clássico",
        nome: "Combo Clássico",
        descricao:
          "Pão com gergilim, chicken 100g, alface, tomate, molho da casa e fritas",
        preco: 17.9,
      },
    ],
  },

  {
    title: "Pizzas",
    itens: [
      {
        img: "src/image/pizza.svg",
        textoAlternativo: "Pizza de Calabresa",
        titleImagem: "Pizza de Calabresa",
        nome: "Pizza de Calabresa",
        descricao:
          "Massa caseira, calabresa defumada, queijo, cebola e orégano.",
        preco: 19.9,
      },
    ],
  },

  {
    title: "Pastéis",
    itens: [
      {
        img: "src/image/pastel.svg",
        textoAlternativo: "Frango com Requeijão",
        titleImagem: "Frango com Requeijão",
        nome: "Frango com Requeijão",
        descricao: "Frango desfiado, requeijão cremoso, milho e azeitona.",
        preco: 11.9,
      },
    ],
  },

  {
    title: "Bebidas",
    itens: [
      {
        img: "src/image/drink.svg",
        textoAlternativo: "Drink",
        titleImagem: "Drink",
        nome: "Drink",
        descricao:
          "Gin tanqueray, suco de limão siciliano, syrup e anguostura bitters.",
        preco: 14.9,
      },
    ],
  },
];

// função para formatar preço
function formatarPreco(preco) {
  return preco.toFixed(2).toString().replace(".", ",");
}

// Seleciona o elemento onde os produtos serão exibidos
const produtosContainer = document.getElementById("produtos-conteiner");

// Itera sobre o array de produtos
produtos.forEach((categoria, categoriasIndex) => {
  // Cria um novo elemento de seção para a categoria
  const section = document.createElement("section");
  section.id = categoria.title.toLowerCase();
  section.innerHTML = `
    <div class="conteiner">
      <h2 class="title">${categoria.title}</h2>
      <div class="grid">
        <!-- Itera sobre os itens da categoria -->
        ${categoria.itens
          .map(
            (item, itemIndex) => `
          <div class="grid-item">
            <img src="${item.img}" alt="${item.textoAlternativo}" title="${
              item.titleImagem
            }" />
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
            <div class="flex">
              <button class="add-product-cart" data-product-index="${categoriasIndex}" data-item-index="${itemIndex}">
                <i class="bi bi-cart2"></i>
              </button>
              <p>R$ <span id="price">${formatarPreco(item.preco)}</span></p>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
  // Adiciona a seção criada ao contêiner de produtos
  produtosContainer.appendChild(section);
});
