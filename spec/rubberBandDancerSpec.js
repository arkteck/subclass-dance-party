describe('rubberBandDancer', function() {

  var rubberBandDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    rubberBandDancer = makeRubberBandDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(rubberBandDancer.$node).to.be.an.instanceof(jQuery);
  });

  describe('dance', function() {
    it('should have the css style for rubberBand', function() {

      expect(rubberBandDancer.$node.hasClass('animate__rubberBand')).to.be.true;
    });
  });
});
