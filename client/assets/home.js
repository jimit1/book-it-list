$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/api",
  }).then((res) => {
    console.log(res);
  });
});
