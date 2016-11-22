function Puck(options, ctx, canvas) {
  this.x = options.x || 400;
  this.y = options.y || 250;
  this.radius = options.radius || 10;
  // this.speed = options.speed || 0;
  this.speedX = options.speedX || 0;
  this.speedY = options.speedY || 0;
  this.ctx = ctx;
  this.canvas = canvas;
}

Puck.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  this.ctx.fillStyle = 'black';
  this.ctx.fill();
  this.ctx.closePath();
};

Puck.prototype.changeDirectionX = function() {
  if(this.speedX) {
    return this.speedX = -this.speedX
  }
}

Puck.prototype.changeDirectionY = function() {
  if(this.speedY){
    return this.speedY = -this.speedY
  }
}



module.exports = Puck;
