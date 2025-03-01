import { gerarMensagemNaTela } from "./mensagens.js";

let quantDicas = 0;

export function apresentarDicas(ObjetoFilme) {
  if (quantDicas < 1) {
    console.log(ObjetoFilme.overview);

    const div = document.createElement("div");
    div.id = "dica";

    const sair = document.createElement("p");
    sair.innerText = "X";

    sair.addEventListener("click", function () {
      div.style.display = "none";
    });

    const h1 = document.createElement("h1");
    h1.innerText = "Sinopse";

    const p = document.createElement("p");
    p.innerText = ObjetoFilme.overview;

    div.append(sair, h1, p);
    document.body.appendChild(div);

    quantDicas++;
  } else {
    gerarMensagemNaTela("Voce já utilizou sua dica.", "red");
  }
}
