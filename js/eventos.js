import { iniciarPartida } from "./game.js";
import { gerarMensagemNaTela } from "./mensagens.js";

document.addEventListener("DOMContentLoaded", function () {
  let dificuldade = null;

  document.querySelectorAll(".dificuldade-btn").forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelectorAll(".dificuldade-btn")
        .forEach((btn) => btn.classList.remove("selecionado"));
      this.classList.add("selecionado");
      dificuldade = this.getAttribute("data-dificuldade");
    });
  });

  document.getElementById("iniciar").addEventListener("click", function () {
    if (dificuldade) {
      document.getElementById("geral").style.display = "none";
      iniciarPartida(dificuldade);
    } else {
      gerarMensagemNaTela(
        "Por favor, selecione uma dificuldade antes de iniciar!",
        "red"
      );
    }
  });
});
