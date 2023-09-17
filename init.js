(function() {

  const overworld = new Overworld({
    element: document.querySelector('body'),
    currentPlayer: prompt('Character') || 'Hero'
  });
  overworld.init();

})();
var trigo = null;