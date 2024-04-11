const VELOCIDADE = 100;
const INTERVALO_CLIQUE_IDEAL = 1000; // (ms)
const MARGEM_TEMPO = 500;
const PERGUNTAS_POR_PARTIDA = 2;

let pontuacao = 0;
let tempoUltimoClique = 0;

let numPerguntas = 0;

const divIntervalo = document.getElementById("intervalo")
const divPontuacao = document.getElementById("pontuação")


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

  if(numPerguntas == PERGUNTAS_POR_PARTIDA) 
  {
    setTimeout(endRound, 1000);
  }
}

document.addEventListener("click", processarClique);

function endRound() {
  alert(`Pontuação final: ${pontuacao} `);
  window.location.reload();
}

