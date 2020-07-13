$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/api/feed",
  }).then((user) => {
    console.log(user);
    $("#userId").text(user.id);
  });
});
