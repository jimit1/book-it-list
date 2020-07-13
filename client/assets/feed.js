$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/",
  }).then((user) => {
    console.log("/");
    $("#userId").text(user.id);
  });
});
