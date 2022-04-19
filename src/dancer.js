// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {

  var newDancer = new Dancer(top, left, timeBetweenSteps);
  newDancer.step();
  newDancer.setPosition();
  return newDancer;
  // use jQuery to create an HTML <span> tag
  // dancer.step();



  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  // dancer.setPosition(top, left);

};

var Dancer = function(top, left, timeBetweenSteps) {

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer animate__animated"></span>');
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  // dancer.step();

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  // dancer.setPosition(top, left);

};

Dancer.prototype.step = function() {
  //console.log(this.step, this.timeBetweenSteps, 'makeDancer.prototype.step');
  // setTimeout(function(){ console.log('test') }, 100);
  setTimeout( this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function() {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$node.css(styleSettings);
};
// the basic dancer doesn't do anything interesting at all on each step,
// it just schedules the next step