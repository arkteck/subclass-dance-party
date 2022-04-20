$(document).ready(function() {
  window.dancers = [];

  const moveDancers = function(dancer, originTop, originLeft, destTop, destLeft, i, n) {
    if (i <= n) {
      dancer.top = originTop + (destTop - originTop) * i / n;
      dancer.left = originLeft + (destLeft - originLeft) * i / n;
      dancer.setPosition();
      i++;
      setTimeout(moveDancers.bind(this, dancer, originTop, originLeft, destTop, destLeft, i, n), 10);
    }
  };

  const detectCollision = function() {
    let dancers = window.dancers.slice();
    for (let i = 0; dancers.length > 1 && i < dancers.length; i++) {
      let dancer = dancers[i];
      let otherDancers = dancers.slice();
      otherDancers.splice(i, 1);
      otherDancers = otherDancers.filter(function(d) {
        return calculateDistance(dancer, d) < 45;
      });
      if (otherDancers.length) {
        if (dancer.$node.find('.angry').length === 0) {
          $('<div class="angry"></div>').appendTo(dancer.$node);
        }
        otherDancers.forEach(function(d) {
          if (d.$node.find('.angry').length === 0) {
            $('<div class="angry"></div>').appendTo(d.$node);
          }
        });
      } else {
        dancer.$node.find('.angry').remove();
      }
    }
  };

  setInterval(detectCollision, 50);

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    let dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    let dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    let dancer = dancerMakerFunction(
      $('body').height() * .20 + $('body').height() * .75 * Math.random(),
      $('body').width() * .05 + $('body').width() * .9 * Math.random(),
      Math.random() * 1000
    );
    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  const calculateDistance = function(dancer0, dancer1) {
    return Math.sqrt(Math.pow(dancer0.top - dancer1.top, 2) + Math.pow(dancer0.left - dancer1.left, 2));
  };

  $('.couples').on('click', function(event) {
    let dancers = window.dancers.slice();
    while (dancers.length > 1) {
      let dancer1 = dancers.shift();
      let closestID = 0;
      let closestDist = calculateDistance(dancer1, dancers[0]);
      for (let i = 1; i < dancers.length; i++) {
        let dist = calculateDistance(dancer1, dancers[i]);
        if (dist < closestDist) {
          closestDist = dist;
          closestID = i;
        }
      }
      let dancer2 = dancers[closestID];
      dancers.splice(closestID, 1);
      let centerTop = (dancer1.top + dancer2.top) / 2;
      let centerLeft = (dancer1.left + dancer2.left) / 2;
      let dancer1top0 = dancer1.top;
      let dancer2top0 = dancer2.top;
      let dancer1left0 = dancer1.left;
      let dancer2left0 = dancer2.left;
      let i = 1;
      let n = Math.floor(Math.random() * 300) + 50;
      moveDancers(dancer1, dancer1top0, dancer1left0, centerTop, centerLeft - 25, i, n);
      moveDancers(dancer2, dancer2top0, dancer2left0, centerTop, centerLeft + 25, i, n);
    }
    if (dancers.length === 1) {
      setTimeout(function() {
        $('<div class="sad"></div>').appendTo(dancers[0].$node);
        setTimeout(function() {
          dancers[0].$node.removeClass('animate__infinite');
          dancers[0].$node.addClass('animate__backOutRight');
          setTimeout(function() {
            dancers[0].$node.remove();
            let sadDancer = window.dancers.indexOf(dancers[0]);
            window.dancers.splice(sadDancer, 1);
          }, 5000);
        }, 1000);
      }, 3000);
    }

    $('.lights:hidden').fadeIn('slow');

  });

  $('.lineup').on('click', function(event) {
    $('.lights').fadeOut(200, 'swing');
    let horizon = $('body').height() * .67;
    let dancers = window.dancers.slice();
    dancers.forEach(function(dancer) {
      let i = 1;
      let n = Math.floor(Math.random() * 300) + 50;
      let dancertop0 = dancer.top;
      let dancerleft0 = dancer.left;
      moveDancers(dancer, dancertop0, dancerleft0, horizon, dancerleft0, i, n);
    });
  });

  $('.freestyle').on('click', function(event) {
    $('.lights').fadeOut(200, 'swing');
    let dancers = window.dancers.slice();
    dancers.forEach(function(dancer) {
      let i = 1;
      let n = Math.floor(Math.random() * 300) + 50;
      let dancertop0 = dancer.top;
      let dancerleft0 = dancer.left;
      let top = $('body').height() * .20 + $('body').height() * .75 * Math.random();
      let left = $('body').width() * .05 + $('body').width() * .9 * Math.random();
      moveDancers(dancer, dancertop0, dancerleft0, top, left, i, n);
    });
  });

  $('body').on({mousedown: function() {
    $(this).addClass('buttonDown');
  }, mouseup: function() { $(this).removeClass('buttonDown'); }}, '.button');

  $('.clearTheFloor').on('click', function(event) {
    $('.lights').fadeOut(200, 'swing');
    window.dancers.forEach(function(dancer) {
      if (dancer.left < $('body').width() / 2 ) {
        setTimeout(function() {
          dancer.$node.find('.angry').remove();
          $('<div class="sad"></div>').appendTo(dancer.$node);
          setTimeout(function() {
            dancer.$node.removeClass('animate__infinite');
            dancer.$node.addClass('animate__backOutLeft');
            setTimeout(function() {
              dancer.$node.remove();
            }, 5000);
          }, 1000);
        }, 1000);

      } else {
        setTimeout(function() {
          dancer.$node.find('.angry').remove();
          $('<div class="sad"></div>').appendTo(dancer.$node);
          setTimeout(function() {
            dancer.$node.removeClass('animate__infinite');
            dancer.$node.addClass('animate__backOutRight');
            setTimeout(function() {
              dancer.$node.remove();
            }, 5000);
          }, 1000);
        }, 1000);
      }
    });
    window.dancers = [];

  });
});

