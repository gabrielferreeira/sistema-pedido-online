const abrirCarrinho = document.getElementById("abrir-carrinho");
const fecharCarrinho = document.getElementById("cancelar");
const carrinho = document.getElementById("carrinho");
const overlay = document.getElementById("overlay");

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
