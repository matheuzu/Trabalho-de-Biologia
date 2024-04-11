const TAMANHO_DIV_X = 25;
const TAMANHO_DIV_Y = 100;
const VELOCIDADE_MOVIMENTO = 10
const INTERVALO_GERACAO = 5000; // milissegundos

function gerarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarDivAleatoria() 
{
  const div = document.createElement("div");
  div.id = "obstaculo";

  const posicaoInicialX = window.innerWidth;
  
  div.style.left = `${posicaoInicialX}px`;
  
  
  document.querySelector("#pista").appendChild(div);
  
  definirBackgroundAleatorio(div);

  const animacao = setInterval(() => {

    const posicaoAtualX = parseInt(div.style.left, 10);
    console.log(posicaoAtualX)
    div.style.left = `${posicaoAtualX - VELOCIDADE_MOVIMENTO}px`;

    if (posicaoAtualX <= -TAMANHO_DIV_X) 
    {
      clearInterval(animacao);
      div.remove();
    }

  }, 15); 
}

const imagens = [
  "url(images/bebado.png)",
  "url(images/lata-de-lixo.png)",
  "url(images/lixo.png)"
];

function definirBackgroundAleatorio(div) {
  const indiceAleatorio = gerarNumeroAleatorio(0, imagens.length - 1);
  const imagemAleatoria = imagens[indiceAleatorio];

  div.style.backgroundImage = imagemAleatoria;
}