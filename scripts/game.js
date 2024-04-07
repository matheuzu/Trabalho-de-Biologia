const VELOCIDADE = 100;
const INTERVALO_CLIQUE_IDEAL = 1000; // (ms)
const MARGEM_TEMPO = 500;
const PERGUNTAS_POR_PARTIDA = 3;
const TEMPO_IMUNIDADE = 3000;

let imunidade = false;

let pontuacao = 0;
let tempoUltimoClique = 0;

let numPerguntas = 0;

let partidas = [];

const divIntervalo = document.getElementById("intervalo")
const divPontuacao = document.getElementById("pontuação")

function obterPontuacaoENome() {
  const nome = prompt("Digite o seu nome:");

  const pontuacaoElemento = document.getElementById("pontuação");
  const _pontuacao = parseFloat(pontuacaoElemento.textContent);

  const objetoUsuario = {
      nome: nome,
      pontuacao: _pontuacao
  };

  partidas.push(objetoUsuario); 

  console.log(partidas);

}



function aumentaPontuacao(pontos) 
{
  pontuacao += pontos;
  divPontuacao.textContent = pontuacao;
  divIntervalo.textContent = 0;
  PontuacaoAnim(pontos);
}


function perdePontuacao(pontos) 
{
  if (pontuacao >= pontos) {
    pontuacao -= pontos;
  } else {
    pontuacao = 0;
  }
  
  document.getElementById("pontuação").textContent = pontuacao;
  divIntervalo.textContent = 0;

  PontuacaoAnim(-pontos);
}

function processarClique(event)
{
  const tempoAtual = Date.now();
  const diferencaTempo = tempoAtual - tempoUltimoClique;

  batimento();

  if (Math.abs(diferencaTempo - INTERVALO_CLIQUE_IDEAL) <= MARGEM_TEMPO) 
  {
    aumentaPontuacao(5);
  } else 
  {
    perdePontuacao(5);
  }

  tempoUltimoClique = tempoAtual;

}

function gameControl() {

  numPerguntas++;
  console.log(numPerguntas)
  if(numPerguntas == 3) 
  {
    setTimeout(endRound, 1000);
  }
}

document.addEventListener("click", processarClique);

function endRound() {
  obterPontuacaoENome();
  numPerguntas = 0;
  pontuacao = 0;
  alert("Preparado para o próximo round?");
  imunidade = true;
  player.classList.add("imune");
  setTimeout(() => {
    imunidade = false;
    player.classList.remove("imune");
  }, TEMPO_IMUNIDADE)
  
}