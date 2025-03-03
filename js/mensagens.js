export function gerarMensagemNaTela(msg, color) {
    const div = document.createElement("div");
    div.id = "embadmsg";

    const p = document.createElement("p");
    p.innerText = msg;

    const barraProgresso = document.createElement("div");
    barraProgresso.id = "progress";
    barraProgresso.style.backgroundColor = color;

    div.appendChild(p);
    div.appendChild(barraProgresso);
    document.body.appendChild(div);

    setTimeout(() => {
        div.classList.add("fadeOut");
        setTimeout(() => div.remove(), 500);
    }, 2000);
}

export function telaCarregamento() {
    const carregamento = document.getElementById('carregamento');
    carregamento.style.display = 'flex';

    document.getElementById('jogo').style.display = 'block';
    setTimeout(() => {
        carregamento.style.display = 'none';
    }, 2500);
}

export function gerarTelaFinal(pontuacao) {
    document.getElementById('jogo').style.display = 'none';

    const div = document.createElement("div");
    div.id = "embadFinal";

    const h1 = document.createElement("h1");
    h1.innerText = 'Jogo Encerrado';

    const h3 = document.createElement("h3");
    h3.innerText = `Sua pontuação foi de ${pontuacao} pontos.`;

    const button = document.createElement('button');
    button.innerText = 'Iniciar novo jogo';

    button.addEventListener("click", () => {
        location.reload();
    });

    div.append(h1, h3, button);
    document.body.appendChild(div);
}
