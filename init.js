document.addEventListener("click", ()=>{
var elemento = document.documentElement; // Isso geralmente representa a raiz do documento, ou seja, a página inteira

// Solicita o modo de tela cheia
if (elemento.requestFullscreen) {
  elemento.requestFullscreen();
} else if (elemento.mozRequestFullScreen) { // Para navegadores Firefox
  elemento.mozRequestFullScreen();
} else if (elemento.webkitRequestFullscreen) { // Para navegadores WebKit (Chrome, Safari)
  elemento.webkitRequestFullscreen();
} else if (elemento.msRequestFullscreen) { // Para navegadores Internet Explorer
  elemento.msRequestFullscreen();
}
});

(function() {

  document.body.style.zoom = "100%";

  const overworld = new Overworld({
    element: document.querySelector('body'),
    currentPlayer: prompt('Character') || 'Hero'
  });
  overworld.init();

})();
var trigo = null;
