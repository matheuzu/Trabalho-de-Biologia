
const JANELA_FLUTUANTE = document.getElementById("janela-flutuante");
const TITULO_PERGUNTA = document.getElementById("titulo");
const TEXTO_PERGUNTA = document.getElementById("pergunta");
const RESPOSTAS = document.getElementById("respostas");
const CRONOMETRO = document.getElementById("cronometro");

let respostaCorreta;

let perguntasVisitadas = [];

const questoes = [
  [
    {
    "pergunta": "Qual a função do sistema cardiovascular?",
    "respostas": [
        "Transportar nutrientes e oxigênio",
        "Eliminar resíduos e hormônios",
        "Levar gás carbônico e substâncias tóxicas dos tecidos para eliminação"
    ],
    "correta": 0
  }
  ,{
    "pergunta": "Quantas camadas o coração tem?",
    "respostas": [
        "Três",
        "Quatro",
        "Cinco"
    ],
    "correta": 0
  }
  ],
  [
    {
    "pergunta": "Quantas cavidades tem o coração?",
    "respostas": [
        "Quatro",
        "Duas",
        "Três"
    ],
    "correta": 0
  },
  {
    "pergunta": "Qual a função dos átrios?",
    "respostas": [
        "Transportar o sangue para o corpo",
        "Receber o sangue",
        "Impulsionar o sangue"
    ],
    "correta": 1
  }],
  [
    {
      "pergunta": "Quantos vasos sanguíneos temos?",
      "respostas": [
          "Dois",
          "Três",
          "Quatro"
      ],
      "correta": 1
    },
    {
      "pergunta": "Uma artéria (1) leva o sangue para o coração, que através de uma artéria (2) direciona para os pulmões (3), depois repetindo o mesmo processo. Ache o erro.",
      "respostas": [
          "1",
          "2",
          "3"
      ],
      "correta": 0
  }],



  [
    {
      "pergunta": "Antes de ir para o lado esquerdo (vermelho), para onde o coração bombeia o sangue?",
      "respostas": [
          "Para os pulmões",
          "Para o corpo",
          "Para o átrio direito"
      ],
      "correta": 0
    },
  {
    "pergunta": "Quais são os vasos sanguíneos caracterizados por ter uma parede espessa e elástica?",
    "respostas": [
        "Artérias",
        "Veias",
        "Capilares"
    ],
    "correta": 0
  }],
  [
    {
      "pergunta": "Qual a função dos ventríolos?",
      "respostas": [
        "Fazer trocas gasosas",
        "Proteger o coração",
        "Impulsionar o sangue"
      ],
      "correta": 2
    },   
    {
    "pergunta": "Quais são os vasos sanguíneos caracterizados por ter uma parede fina e válvulas?",
    "respostas": [
        "Artérias",
        "Veias",
        "Capilares"
    ],
    "correta": 1
  },
  ],
  [
 
  {
    "pergunta": "Qual camada do coração tem o papel de revestir externamente o coração e é extremamente fibrosa?",
    "respostas": [
        "Pericárdio",
        "Miocárdio",
        "Endocárdio"
    ],
    "correta": 0
  }, {
    "pergunta": "Quais são os vasos sanguíneos caracterizados por serem extremamente finos e permitirem trocas gasosas?",
    "respostas": [
        "Artérias",
        "Veias",
        "Capilares"
    ],
    "correta": 2
  }
  ],
  [
    {
    "pergunta": "Qual camada do coração tem o papel de revestir internamente o coração?",
    "respostas": [
        "Pericárdio",
        "Miocárdio",
        "Endocárdio"
    ],
    "correta": 2
  },
  {
    "pergunta": "Qual camada do coração é responsável por contrair e relaxar o coração?",
    "respostas": [
        "Pericárdio",
        "Miocárdio",
        "Endocárdio"
    ],
    "correta": 1
  }
]
];


function buscarPerguntaAleatoria() 
{
  if(PERGUNTAS_POR_PARTIDA == perguntasVisitadas.length) return;

  let indiceAleatorio = Math.floor(Math.random() * 2);

  while (perguntasVisitadas.includes(indiceAleatorio)) {
    indiceAleatorio = Math.floor(Math.random() * 2);
  }

  perguntasVisitadas.push(indiceAleatorio);

  exibirPergunta(questoes[ID_PERGUNTA][indiceAleatorio]);
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
  startTimer(INTERVALO_PERGUNTA*2/1000);
}

function verificarResposta(idResposta, correta) 
{

  if (idResposta == correta) {
    mostrarRespostaCorreta(idResposta);
    fecharJanela();
    aumentaPontuacao(200); 
    gameControl();

  } else {
    mostrarRespostaIncorreta(idResposta);
    perdePontuacao(150);
  }

}

function mostrarRespostaCorreta(idResposta) 
{
  const botaoResposta = document.getElementById("resposta-" + idResposta);
  botaoResposta.classList.add("certa");

  setTimeout(() => { botaoResposta.classList.remove("certa"); }, 1000);
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


