(function ($) {
  $(function () {
    $(".sidenav").sidenav();
    $(".parallax").parallax();
  }); // end of document ready
})(jQuery); // end of jQuery name space

// var instance = M.Carousel.init({
//   fullWidth: true,
// });

// Or with jQuery

$(".carousel.carousel-slider").carousel({
  fullWidth: true,
  indicators: true,
});

//collapsible
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".collapsible");
  var instances = M.Collapsible.init(elems, options);
});

// Or with jQuery

$(document).ready(function () {
  $(".collapsible").collapsible();
});
