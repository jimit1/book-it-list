$(document).ready(function () {
  $("select").formSelect();
  let userName = "";
  let userId = 0;

  $.ajax({
    type: "GET",
    url: "/api/user_data",
  })
    .then((res) => {
      userName = res.userName;
      userId = parseInt(res.id);
    })
    .then(() => {
      $.ajax({
        type: "GET",
        url: `/api/seeSettings/${userId}`,
      }).then((res) => {
        $("#form-img").attr("src", res[0].profileUrl);
        $("#profileURL").val(res[0].profileUrl);
        $("#font-choice").val(res[0].font);
        $("#view-choice").val(res[0].view);
        JSON.parse(res[0].mode)
          ? $("#mode-choice").prop("checked", true)
          : $("#mode-choice").prop("checked", false);
        $("select").formSelect();
      });
    });

  $("#saveBtn").on("click", () => {
    $.ajax({
      type: "PATCH",
      url: "/api/updateSettings",
      data: {
        userId: userId,
        profileUrl: $("#profileURL").val(),
        mode: JSON.parse($("#mode-choice").prop("checked")),
        font: $("#font-choice").val(),
        view: $("#view-choice").val(),
      },
    }).then((res) => window.location.replace("/settings"));
  });
});
