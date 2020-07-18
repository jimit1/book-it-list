$(document).ready(function () {
  $("select").formSelect();

  $("#saveBtn").on("click", () => {
    let url = $("#profileURL").val();
    let font = $("#font-choice").val();
    let style = $("#view-choice").val();
    let mode = $("#mode-choice").prop("checked");
    console.log(url, font, style, mode);
  });
});
