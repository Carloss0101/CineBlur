const BASE_URL = 'https://cineblur-backend-production.up.railway.app/api';

export async function getImagem(idFilme) {
    try {
        const response = await fetch(`${BASE_URL}/getImagem?idFilme=${idFilme}`);
        const data = await response.json();
        
        if (data.url) {
            return data.url;
        } else {
            console.log('Nenhuma imagem encontrada.');
        }
    } catch (error) {
        console.error('Erro ao buscar imagens:', error);
    }
}

export async function getFilmesPopulares(filmes) {
    try {
        embaralharArray(filmes);

        const aleatorio = Math.floor(Math.random() * filmes.length);
        
        console.log('Numero aleatorio: ', aleatorio, filmes[aleatorio]);
        const filmePesquisa = filmes[aleatorio]

        const response = await fetch(`${BASE_URL}/getFilmesPopulares?filme=${encodeURIComponent(filmePesquisa)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de posição
    }
}
