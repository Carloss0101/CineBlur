import { getImagem, getFilmesPopulares } from "./api.js";
import { apresentarDicas } from "./dicas.js";
import { gerarMensagemNaTela, telaCarregamento, gerarTelaFinal } from "./mensagens.js";
import filmes from "./filmes.js";

let quantJogadas = 0;
let totalPontos = 0;

export async function iniciarPartida(dificuldade) {
  telaCarregamento();

  const filme = await getFilmesPopulares(filmes);
  const url = await getImagem(filme.id);

  const div = document.getElementById("jogo");
  div.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.innerText = "Adivinhe qual é o filme";

  const img = document.createElement("img");
  img.classList.add(
    dificuldade == "facil"
      ? "jogo-imagem-facil"
      : dificuldade == "medio"
      ? "jogo-imagem-media"
      : "jogo-imagem-dificil"
  );
  img.src = url;
  img.id = "jogo-imagem";

  console.log(filme.original_title, filme.title);

  const divDica = document.createElement("div");
  divDica.id = "geral-dica";

  const imgDica = document.createElement("img");
  imgDica.id = "img-dica";
  imgDica.src = "https://carloss0101.github.io/CineBlur/assets/imagens/dica.png";

  imgDica.addEventListener("click", function () {
    apresentarDicas(filme);
  });

  const divForm = document.createElement("div");
  divForm.id = "Form";

  const input = document.createElement("input");
  input.placeholder = "Digite o nome do filme";
  input.id = "inputFilmeNome";
  input.setAttribute("autocomplete", "off");

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      validarResposta(
        input.value.trim(),
        filme.original_title,
        filme.title,
        dificuldade
      );
    }
  });

  const icon = document.createElement("img");
  icon.src = "assets/imagens/enviar.png";
  icon.id = "icon";
  icon.addEventListener("click", function () {
    validarResposta(
      input.value.trim(),
      filme.original_title,
      filme.title,
      dificuldade
    );
  });

  const buttonPular = document.createElement("button");
  buttonPular.id = "buttonPular";
  buttonPular.innerText = "Pular";

  buttonPular.addEventListener("click", function () {
    buttonPular.disabled = true;
    quantJogadas++;
    gerarMensagemNaTela("Você pulou a rodada!", "yellow");
    proximaRodada(dificuldade);
  
    setTimeout(function() {
      buttonPular.disabled = false;
    }, 5000);
  });

  divDica.append(imgDica);
  divForm.append(input, icon);
  div.append(h1, img, divForm, divDica, buttonPular);
  document.body.appendChild(div);
}

function validarResposta(resposta, tituloOriginal, titulo, dificuldade) {
  if (
    resposta.toLowerCase() === tituloOriginal.toLowerCase() ||
    resposta.toLowerCase() === titulo.toLowerCase()
  ) {
    gerarMensagemNaTela("Parabéns, você acertou o filme!", "green");
    calcularPontos(dificuldade);
    proximaRodada(dificuldade);
  } else {
    gerarMensagemNaTela("Você errou o filme", "red");
  }
}

function calcularPontos(dificuldade) {
  if (dificuldade == "facil") {
    totalPontos += 100;
  } else if (dificuldade == "medio") {
    totalPontos += 200;
  } else {
    totalPontos += 300;
  }
}

function proximaRodada(dificuldade) {
  if (quantJogadas <= 5) {
    iniciarPartida(dificuldade);
  } 
  if(quantJogadas > 5) {
    gerarTelaFinal(totalPontos);
    document.getElementById('jogo').style.display = 'none';
  }
}
