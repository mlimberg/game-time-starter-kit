const canvas = $('#game')[0];
const ctx = canvas.getContext('2d');
const Game = require('./game');

var game = new Game ({}, ctx, canvas)
var gameStart = false;

game.startScreen();

$('#game').on('click', function() {
  clear();
  displayCountdown('3')
  setTimeout(function(){
    clear();
    displayCountdown('2')
    setTimeout(function() {
      clear();
      displayCountdown('1')
      setTimeout(function() {
        clear();
        displayCountdown('FACEOFF!', canvas.width/4.3, '80px')
        setTimeout(function() {
          clear();
          if(gameStart === false){
            start();
            $('#new-game').prop('disabled', false);
            gameStart = true;
          }
        }, 1500)
      }, 800)
    }, 800)
  }, 800)
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

function displayCountdown(num, pos = canvas.width/2.2, font = '150px') {
  ctx.font = font + ' sans-serif'
  ctx.fillText(num, pos, canvas.height/1.8)
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
