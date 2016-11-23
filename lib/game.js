const Paddle = require('./paddle')
const Puck = require('./puck')
const Collision = require('./collision')

var scoreLeft = 0;
var scoreRight = 0;
var number = generateRandom();

function generateRandom() {
  return Math.random();
}

generateRandom();

function Game(options, ctx, canvas) {
  this.gameState = false;
  this.spacebar = true;
  this.paddleLeft = new Paddle({}, ctx, canvas);
  this.paddleRight = new Paddle({x:770}, ctx, canvas);
  this.puck = new Puck({}, ctx, canvas);
  this.paddleHit = 0;
  this.ctx = ctx;
  this.canvas = canvas;
}

Game.prototype.run = function() {
  this.gameSetup();
  this.collision();
  this.updateScore();
  console.log('p-hit' + this.paddleHit)
  console.log('speedX' + this.puck.speedX)
}

Game.prototype.gameSetup = function() {
  this.paddleLeft.draw('green');
  this.paddleRight.draw();
  this.puck.draw();
  this.setMoveKeys();
  this.movePaddles();
  this.puckMovement();
}

Game.prototype.collision = function() {
  this.puckCollisionWithRink();
  this.paddleCollision();
}

Game.prototype.startScreen = function() {
  let { ctx, canvas } = this;
  let sec = canvas.height/10
  ctx.font = "40px sans-serif";
  ctx.fillText("LEFT PLAYER:", 50, sec * 3)
  ctx.font = "30px sans-serif";
  ctx.fillText("A = UP", 75, sec * 4)
  ctx.fillText("Z = DOWN", 75, sec * 5)

  ctx.font = "40px sans-serif";
  ctx.fillText("RIGHT PLAYER:", 400, sec * 3)
  ctx.font = "30px sans-serif";
  ctx.fillText("Up Arrow = UP", 450, sec * 4)
  ctx.fillText("Down Arrow = DOWN", 450, sec * 5)

  ctx.font = "30px sans-serif"
  ctx.fillText("First to 10 Wins", 280, sec * 8)

  ctx.font = "30px sans-serif"
  ctx.fillText("Spacebar to start puck", 235, sec * 8.7)

  ctx.font = "30px sans-serif";
  ctx.fillStyle = 'red'
  ctx.fillText("Click Screen to Start", 250, sec * 9.5)
}

Game.prototype.setMoveKeys = function() {
  //up is 38, down is 40, a is 65, z is 90
  let { paddleLeft, paddleRight } = this
  $(document).on('keydown', function(e) {
    if(e.keyCode === 38) {
      paddleRight.moveUp = true;
    }
    if(e.keyCode === 40) {
      paddleRight.moveDown = true;
    }
    if(e.keyCode === 65) {
      paddleLeft.moveUp = true;
    }
    if(e.keyCode === 90) {
      paddleLeft.moveDown = true;
    }
  });

  $(document).on('keyup', function(e) {
    if(e.keyCode === 38) {
      paddleRight.moveUp = false;
    }
    if(e.keyCode === 40) {
      paddleRight.moveDown = false;
    }
    if(e.keyCode === 65) {
      paddleLeft.moveUp = false;
    }
    if(e.keyCode === 90) {
      paddleLeft.moveDown = false;
    }
  });
}

Game.prototype.movePaddles = function() {
  let { paddleLeft, paddleRight } = this;
  if(paddleLeft.moveUp === true && paddleLeft.y > 0) {
    paddleLeft.y -= paddleLeft.speed;
  }
  if(paddleLeft.moveDown === true && paddleLeft.y + paddleLeft.height < 500) {
    paddleLeft.y += paddleLeft.speed;
  }
  if(paddleRight.moveUp === true && paddleRight.y > 0) {
    paddleRight.y -= paddleRight.speed;
  }
  if(paddleRight.moveDown === true && paddleRight.y + paddleRight.height < 500) {
    paddleRight.y += paddleRight.speed;
  }
}

Game.prototype.puckReset = function() {
  this.gameState = false;
  this.spacebar = true;
  this.puck.x = this.canvas.width/2;
  this.puck.y = this.canvas.height/2;
  this.puck.speedX = 0;
  this.puck.speedY = 0;
}

Game.prototype.puckMovement = function() {
  let { puck, gameState, spacebar, paddleHit } = this;
  if(gameState === false && spacebar === true) {
    puck.x = puck.x
    puck.y = puck.y
  }
  $(document).on('keypress', function(e) {
    if(e.keyCode === 32 && gameState === false && spacebar === true) {
      gameState = true;
      spacebar = false;
      puck.speedX = 7;
      puck.speedY = 7;
    } else {
      e.preventDefault();
    }
  });
    if(number < 0.25) {
      puck.x += puck.speedX
      puck.y += puck.speedY
    } else if(number >= .25 && number < .5){
        puck.x += puck.speedX
        puck.y -= puck.speedY
    } else if (number >= .5 && number < .75) {
        puck.x -= puck.speedX
        puck.y += puck.speedY
    } else {
        puck.x -= puck.speedX
        puck.y -= puck.speedY
    }
    if(paddleHit >= 5) {
      if(puck.speedX > 0){
          puck.speedX = 10;
      } else if(puck.speedX < 0){
        puck.speedX = -10;
      }
      if(puck.speedY > 0) {
        puck.speedY = 10;
      } else if (puck.speedY < 0) {
        puck.speedY = -10;
      }
    }


    //   } 8;
    //   puck.speedY = 8;
    // } else if (paddleHit === 20) {
    //   puck.speedX = 9;
    //   puck.speedY = 9;
    // } else if (paddleHit >= 30) {
    //   puck.speedX = 10;
    //   puck.speedY = 10;
    // }
  }

  Game.prototype.newFaceoff = function() {
    number = generateRandom();
    this.gameState = false;
    this.puckReset();
    this.paddleHit = 0;
  }

  Game.prototype.puckCollisionWithRink = function() {
    let { puck, canvas } = this;
    if((puck.x - puck.radius) > canvas.width) {
      scoreLeft += 1;
      this.newFaceoff();
    }
    if(puck.x + puck.radius < 0) {
      scoreRight += 1;
      this.newFaceoff();
    }
    if((puck.y - puck.radius) <= 0) {
      puck.changeDirectionY();
    }
    if(puck.y >= canvas.height - puck.radius) {
      puck.changeDirectionY();
    }
  };

Game.prototype.updateScore = function() {
  // let { scoreLeft, scoreRight } = this;
  $('#score-left').text(scoreLeft);
  $('#score-right').text(scoreRight);
}

Game.prototype.paddleCollision = function() {
  let { puck, paddleLeft, paddleRight } = this;
  if(detectCollision(puck, paddleRight)) {
    if((puck.x + puck.radius) >= paddleRight.x){
      puck.changeDirectionX();
      this.paddleHit += 1;
    }
  }
  if(detectCollision(puck, paddleLeft)) {
    if((puck.x - puck.radius) <= (paddleLeft.x + paddleLeft.width)) {
      puck.changeDirectionX();
      this.paddleHit += 1;
    }
  }
}

function detectCollision(puck, thing) {
  let bottomOfThing = false;
  let leftSideOfThing = false;
  let rightSideOfThing = false;
  let topOfThing = false;
  if(puck.y - puck.radius <= thing.y + thing.height) {
    bottomOfThing = true;
  }
  if(puck.x + puck.radius >= thing.x) {
    leftSideOfThing = true;
  }
  if(puck.x - puck.radius <= thing.x + thing.width) {
    rightSideOfThing = true;
  }
  if(puck.y + puck.radius >= thing.y) {
    topOfThing = true;
  }
  if(bottomOfThing && leftSideOfThing && rightSideOfThing && topOfThing) {
    return true;
  }
};







module.exports = Game;
