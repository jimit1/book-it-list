$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/api/user_data",
  }).then((user) => {
    console.log(user);
    $("#userId").text(user.id);
  });
});
