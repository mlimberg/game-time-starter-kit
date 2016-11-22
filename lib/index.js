const canvas = $('#game')[0];
const ctx = canvas.getContext('2d');
const Game = require('./game');

var game = new Game ({}, ctx, canvas)

game.startScreen();

$('#game').on('click', function() {
    start();
});

function start() {
  requestAnimationFrame(function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.run();
    requestAnimationFrame(gameLoop);
  });
}
