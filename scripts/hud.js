function hud() 
{
  const tempoAtual = Date.now();
  const diferencaTempo = tempoAtual - tempoUltimoClique;
  
  divIntervalo.textContent = (diferencaTempo/1000).toFixed(1) + 's';

  if (Math.abs(diferencaTempo - INTERVALO_CLIQUE_IDEAL) <= MARGEM_TEMPO) 
  {
    divIntervalo.style = "border-color: red; background-color:red; padding: 30px 25px;";
  }

  if (Math.abs(diferencaTempo - INTERVALO_CLIQUE_IDEAL) >= MARGEM_TEMPO) 
  {
    divIntervalo.style = "black";
  }
  if (diferencaTempo - INTERVALO_CLIQUE_IDEAL >= MARGEM_TEMPO) {  
    perdePontuacao(10);  
    tempoUltimoClique = tempoAtual;
  }
}

function PontuacaoAnim(valor) {
    let spanPontuacao = document.createElement("span");
    
    spanPontuacao.className = "pontuação-alert"
    
    if(valor < 0) 
    {
        spanPontuacao.textContent = valor;
        spanPontuacao.style.color = "red";
    } else 
    {
        spanPontuacao.textContent = "+" + valor;
        spanPontuacao.style.color = "green";
    }

    spanPontuacao.style.opacity = 1;
    
    document.getElementById("pontuação").appendChild(spanPontuacao);
    
    let animar = setInterval(function() {
  
      spanPontuacao.style.opacity -= 0.05;
  
      if (spanPontuacao.style.opacity <= 0) {
          clearInterval(animar); 
          try {
            document.getElementById("pontuação").removeChild(spanPontuacao);
          } catch (err) {};
       }
  }, 20);
}  

function batimento () {
  document.getElementById("coração").style.width = "250px";
  document.getElementById("coração").style.height = "250px";
  setTimeout(() => {
    document.getElementById("coração").style.width = "200px";
    document.getElementById("coração").style.height = "200px";
  }, 100)
  efeitoSonoro("../sfx/batimento.m4a")
}

