const PERGUNTAS_JSON = "perguntas.json"; 

const JANELA_FLUTUANTE = document.getElementById("janela-flutuante");
const TITULO_PERGUNTA = document.getElementById("titulo");
const TEXTO_PERGUNTA = document.getElementById("pergunta");
const RESPOSTAS = document.getElementById("respostas");
const CRONOMETRO = document.getElementById("cronometro");
const INTERVALO_PERGUNTA = 2000; // ms
let respostaCorreta;

let perguntasVisitadas = [];

function buscarPerguntaAleatoria() 
{
    fetch(PERGUNTAS_JSON)
      .then((response) => response.json())
        .then((json) => {

          if(json.length == perguntasVisitadas.length) return

          let indiceAleatorio = Math.floor(Math.random() * json.length);
    
          while (perguntasVisitadas.includes(indiceAleatorio)) 
          {
            indiceAleatorio = Math.floor(Math.random() * json.length);
          }
    
          perguntasVisitadas.push(indiceAleatorio);
    
          exibirPergunta(json[indiceAleatorio]);
      });
  }

  function exibirPergunta(pergunta) 
  {
    TITULO_PERGUNTA.textContent = "Pergunta";
    TEXTO_PERGUNTA.textContent = pergunta.pergunta;
  
    RESPOSTAS.innerHTML = "";
  
    for (let i = 0; i < pergunta.respostas.length; i++) 
    {
      const botao = document.createElement("button");
      botao.id = `resposta-${i}`;
      botao.textContent = pergunta.respostas[i];
      botao.onclick = () => verificarResposta(i, pergunta.correta);
      RESPOSTAS.appendChild(botao);
    }
    
    respostaCorreta = pergunta.correta
    abrirJanela();

  }

function abrirJanela() {
  CRONOMETRO.classList.add("ativa")
  JANELA_FLUTUANTE.classList.add("ativa");
  startTimer(INTERVALO_PERGUNTA/1000);
}

function verificarResposta(idResposta, correta) 
{

  if (idResposta == correta) {
    fecharJanela();
    aumentaPontuacao(200); 
    gameControl();

  } else {
    mostrarRespostaIncorreta(idResposta);
    perdePontuacao(150);
  }

}

function mostrarRespostaIncorreta(idResposta) 
{
  const botaoResposta = document.getElementById("resposta-" + idResposta);
  botaoResposta.classList.add("errada");

  setTimeout(() => { botaoResposta.classList.remove("errada"); }, 1000);
}

function fecharJanela() {
  CRONOMETRO.classList.remove("ativa")
  JANELA_FLUTUANTE.classList.remove("ativa");
}

document.querySelector("body").addEventListener("keydown", (evento) => {
  if(JANELA_FLUTUANTE.classList.contains("ativa")) {
    const numeroResposta = parseInt(evento.key);
  
    if (numeroResposta >= 1 && numeroResposta <= 3) {
      verificarResposta(numeroResposta - 1, respostaCorreta);
    }
  }
});

function startTimer(seconds) {

  const target = document.querySelector('#cronometro');
  let counter = seconds;

  function pad(number) {
      return (number < 10) ? '0' + number : number;
  }

  function display(seconds) {
      target.innerHTML = `${pad(seconds)}`;
  }

  function count() {

      display(counter);
      counter--;

      const clock = setInterval(() => {

          display(counter);
          counter--;

          if (counter < 0) {

            if(JANELA_FLUTUANTE.classList.contains("ativa")) {
              perdePontuacao(250);
              gameControl();
            }
              
            fecharJanela();
            setTimeout(buscarPerguntaAleatoria, INTERVALO_PERGUNTA);
            clearInterval(clock);
          }
      }, 1000);
  }

  count();

}



setTimeout(buscarPerguntaAleatoria, INTERVALO_PERGUNTA);