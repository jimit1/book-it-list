$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  $.ajax({
    type: "GET",
    url: `/api/find/${id}`,
  }).then((res) => {
    $("#editTodo").text(res[0].text);

    res[0].completed
      ? $("#isCompleted").prop("checked", true)
      : $("#isCompleted").prop("checked", false);
  });

  $("#cancelBtn").on("click", () => {
    window.location.href = "/";
  });

  $("#confirmBtn").on("click", () => {
    const text = $("#editTodo").val();

    const completeStatus = $("#isCompleted").is(":checked") ? "true" : "false";

    $.ajax({
      type: "PATCH",
      url: "/api",
      data: { todoText: text, todoId: id, todoCompleted: completeStatus },
    })
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  });
});
