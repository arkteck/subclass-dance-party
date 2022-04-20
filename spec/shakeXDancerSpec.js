describe('shakeXDancer', function() {

  var shakeXDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    shakeXDancer = makeShakeXDancer(10, 20, timeBetweenSteps);
  });
  it('should have a jQuery $node object', function() {
    expect(shakeXDancer.$node).to.be.an.instanceof(jQuery);
  });

  describe('dance', function() {
    it('should have the css style for shakeX', function() {

      expect(shakeXDancer.$node.hasClass('animate__shakeX')).to.be.true;
    });
  });
});
