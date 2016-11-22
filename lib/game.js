const Paddle = require('./paddle')
const Puck = require('./puck')
const Collision = require('./collision')

var scoreLeft = 0;
var scoreRight = 0;
var lastScore = 'left';

function Game(options, ctx, canvas) {
  this.gameState = false;
  this.spacebar = true;
  this.level = 0;
  this.paddleLeft = new Paddle({}, ctx, canvas);
  this.paddleRight = new Paddle({x:770}, ctx, canvas);
  this.puck = new Puck({}, ctx, canvas);
  // this.scoreLeft = 0;
  // this.scoreRight = 0;
  this.ctx = ctx;
  this.canvas = canvas;
}

Game.prototype.run = function() {
  this.gameSetup();
  this.collision();
  this.updateScore();
  // console.log(this.scoreLeft)
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
  })

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
  let { puck, gameState, spacebar } = this;
  if(gameState === false && spacebar === true) {
    puck.x = puck.x
    puck.y = puck.y
  }
  $(document).on('keypress', function(e) {
    if(e.keyCode === 32 && gameState === false && spacebar === true) {
      gameState = true;
      spacebar = false;
      puck.speedX = 4;
      puck.speedY = 4;
    } else {
      e.preventDefault();
    }
  });
    if(lastScore === 'left') {
      puck.x += puck.speedX
      puck.y -= puck.speedY
    } else if(lastScore === 'right') {
      puck.x -= puck.speedX
      puck.y -= puck.speedY
    }
  }

  Game.prototype.puckCollisionWithRink = function() {
    let { puck, canvas } = this;
    if((puck.x - puck.radius) > canvas.width) {
      scoreLeft += 1;
      lastScore = 'left';
      this.gameState = false;
      this.puckReset();
    }
    if(puck.x + puck.radius < 0) {
      scoreRight += 1;
      lastScore = 'right'
      this.gameState = false;
      this.puckReset();
    }
    if((puck.y - puck.radius) <= 0) {
      puck.changeDirectionY();
    }
    if(puck.y > canvas.height - puck.radius) {
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
    }
  }
  if(detectCollision(puck, paddleLeft)) {
    if((puck.x - puck.radius) <= (paddleLeft.x + paddleLeft.width)) {
      puck.changeDirectionX();
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
