const player = document.getElementById("player");
let colidindo = false;

document.querySelector("body").addEventListener("keydown", (evento) => {
  if (evento.key === " " && !player.classList.contains("pulo")) 
  {
    player.classList.add("pulo");
    setTimeout(() => { player.classList.remove("pulo");}, 1500);
  }
});

function verificarColisao(jogador, obstaculo) {
  try 
  {
    const jogadorBoundingBox = jogador.getBoundingClientRect();
    const obstaculoBoundingBox = obstaculo.getBoundingClientRect();
  
    if (jogadorBoundingBox.left < obstaculoBoundingBox.right &&
      jogadorBoundingBox.right > obstaculoBoundingBox.left &&
      jogadorBoundingBox.top < obstaculoBoundingBox.bottom &&
      jogadorBoundingBox.bottom > obstaculoBoundingBox.top) 
      {
        if(colidindo) 
        {
          colidindo = false;            
          perdePontuacao(50);
          efeitoSonoro("../sfx/tropeco.m4a")
        }
      } 

  } catch (err) 
  {
    colidindo = true;
  }
}



