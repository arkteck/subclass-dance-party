var makeShakeXDancer = function(top, left, timeBetweenSteps) {
  var newShakeXDancer = new ShakeXDancer(top, left, timeBetweenSteps);
  newShakeXDancer.step();
  newShakeXDancer.setPosition();

  return newShakeXDancer;

};

var ShakeXDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.oldStep = Dancer.prototype.step;

  this.$node.addClass('animate__shakeX');
  this.$node.addClass('animate__infinite');

  //console.log(this.oldStep);
};

ShakeXDancer.prototype = Object.create(Dancer.prototype);
ShakeXDancer.prototype.constructor = ShakeXDancer;

ShakeXDancer.prototype.step = function() {
  this.oldStep();
};