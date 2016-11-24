const canvas = $('#game')[0];
const ctx = canvas.getContext('2d');
const Game = require('./game');

var game = new Game ({}, ctx, canvas)
var gameStart = false;

game.startScreen();

$('#game').on('click', function() {
  if(gameStart === false){
    start();
    $('#new-game').prop('disabled', false);
    gameStart = true;
  }
});

function start() {
  requestAnimationFrame(function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.run();
    requestAnimationFrame(gameLoop);
  });
}

$('#new-game').on('click', function() {
  game = new Game({}, ctx, canvas)
});
