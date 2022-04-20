var makeBlinkyDancer = function(top, left, timeBetweenSteps) {
  var newBlinkyDancer = new BlinkyDancer(top, left, timeBetweenSteps);
  newBlinkyDancer.step();
  newBlinkyDancer.setPosition();

  return newBlinkyDancer;

};

var BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.oldStep = Dancer.prototype.step;

  this.$node.addClass('animate__flash');
  this.$node.addClass('animate__infinite');


  //console.log(this.oldStep);
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function() {
  this.oldStep();

  // this.$node.toggle();
};
//setTimeout(this.step, this.timeBetweenSteps);
// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
// call the old version of step at the beginning of any call to this new version of step
//makeDancer.prototype.step();
// toggle() is a jQuery method to show/hide the <span> tag.
// See http://api.jquery.com/category/effects/ for this and
// other effects you can use on a jQuery-wrapped html tag.