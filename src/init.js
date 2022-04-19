$(document).ready(function() {
  window.dancers = [];

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
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  var calculateDistance = function(dancer0, dancer1) {
    return Math.sqrt(Math.pow(dancer0.top - dancer1.top, 2) + Math.pow(dancer0.left - dancer1.left, 2));
  };

  $('.pairUpButton').on('click', function(event) {
    let dancers = window.dancers;
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

    }
    if (dancers.length === 1) {
      dancers[0].addClass('sad');
    }
  });


  // $('body').on({mouseenter: function() { $(this).addClass('animate__bounce'); }, mouseleave: function() { $(this).removeClass('animate__bounce'); }}, '.dancer');

});

