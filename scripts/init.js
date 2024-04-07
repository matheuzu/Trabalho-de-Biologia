const JSON_ID = prompt("Questionário");
const INTERVALO_PERGUNTA = 2000; // ms

function startGame(seconds) {

    const target = document.querySelector('#start');
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
  
                clearInterval(clock);
                target.remove();
                
                const intervalo = setInterval(hud, 10);
                setInterval(gerarDivAleatoria, INTERVALO_GERACAO);
                setTimeout(buscarPerguntaAleatoria, INTERVALO_PERGUNTA);
                setInterval(() => {
                    let obstaculo = document.getElementById("obstaculo");
                    verificarColisao(player, obstaculo);
                }, 100);
            }
        }, 1000);
    }
  
    count();
  
}

startGame(3);