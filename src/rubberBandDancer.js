var makeRubberBandDancer = function(top, left, timeBetweenSteps) {
  var newRubberBandDancer = new RubberBandDancer(top, left, timeBetweenSteps);
  newRubberBandDancer.step();
  newRubberBandDancer.setPosition();

  return newRubberBandDancer;

};

var RubberBandDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.oldStep = Dancer.prototype.step;

  this.$node.addClass('animate__rubberBand');
  this.$node.addClass('animate__infinite');

};

RubberBandDancer.prototype = Object.create(Dancer.prototype);
RubberBandDancer.prototype.constructor = RubberBandDancer;

RubberBandDancer.prototype.step = function() {
  this.oldStep();

  //this.$node.toggle();
};