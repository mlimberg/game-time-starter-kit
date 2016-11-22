const Puck = require('./puck');

function Collision(thingA, thingB, ctx, canvas) {
  this.thingA = thingA;
  this.thingB = thingB;
  this.ctx = ctx;
  this.canvas = canvas;
}

Collision.prototype.puckAndPaddleCollision = function() {
  if(thingA.y - thingA.radius <= thingB.y + thingB.height) {
    bottomOfBlock = true;
  }
  if(thingA.x + thingA.radius >= thingB.x) {
    leftSideOfBlock = true;
  }
  if(thingA.x - thingA.radius <= thingB.x + thingB.width) {
    rightSideOfBlock = true;
  }
  if(thingA.y + thingA.radius >= thingB.y) {
    topOfBlock = true;
  }
  if(bottomOfBlock && leftSideOfBlock && rightSideOfBlock && topOfBlock) {
    return true
  }
}

Collision.prototype.puckAndCanvasCollision = function() {
  if(puck.x > canvas.width - puck.radius) {
  puck.changeDirectionX();
  }
  if(puck.x < 0 + puck.radius) {
    puck.changeDirectionX();
  }
  if(puck.y < 0 + puck.radius) {
    puck.changeDirectionY();
  }
  if(puck.y > canvas.height - puck.radius) {
    puck.changeDirectionY();
  }
};


module.exports = Collision
