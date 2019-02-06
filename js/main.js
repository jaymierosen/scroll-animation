// inspiration: https://codepen.io/chriscoyier/pen/YXgWam
// Get a reference to the <path>
var path = document.querySelector('#female-path');
var malePath = document.querySelector('#male-path');
// Get length of path... ~577px in this case
var pathLength = path.getTotalLength();
var malePathLength = malePath.getTotalLength();
// Make very long dashes (the length of the path itself)
path.style.strokeDasharray = pathLength + ' ' + pathLength;
malePath.style.strokeDasharray = malePathLength + ' ' + malePathLength;
// Offset the dashes so the it appears hidden entirely
path.style.strokeDashoffset = pathLength;
malePath.style.strokeDashoffset = malePathLength;
// Jake Archibald says so
// https://jakearchibald.com/2013/animated-line-drawing-svg/
path.getBoundingClientRect();
malePath.getBoundingClientRect();
// When the page scrolls...
window.addEventListener("scroll", function (e) {
  // What % down is it? 
  // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
  // Had to try three or four differnet methods here. Kind of a cross-browser nightmare.
  var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  // Length to offset the dashes
  var drawLength = pathLength * scrollPercentage;
  var maleDrawLength = malePathLength * scrollPercentage;
  // Draw in reverse
  path.style.strokeDashoffset = pathLength - drawLength;
  malePath.style.strokeDashoffset = malePathLength - maleDrawLength;
  // When complete, remove the dash array, otherwise shape isn't quite sharp
  // Accounts for fuzzy math
  if (scrollPercentage >= 0.99) {
    path.style.strokeDasharray = "none";
    malePath.style.strokeDasharray = "none";
  } else {
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    malePath.style.strokeDasharray = malePathLength + ' ' + malePathLength;
  }
});