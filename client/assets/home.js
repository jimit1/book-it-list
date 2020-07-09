$(document).ready(function () {
  getTodos().then((res) => {
    renderTodos(res);
  });

  $("#submitBtn").on("click", () => {
    const todoText = $("#todoText").val();
    $.ajax({
      type: "POST",
      url: "/api",
      data: { text: todoText },
    }).then((res) => {
      getTodos().then((res) => {
        renderTodos(res);
      });
    });
    $("#todoText").val("");
  });
});

const getTodos = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "/api",
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => console.log(err));
  });
};

$(document).on("click", "#btnUpdate", function () {
  const todoID = $(this).attr("data-id");

  window.location.href = `/edit?id=${todoID}`;
});

$(document).on("click", "#btnDelete", function () {
  const todoID = $(this).attr("data-id");

  window.location.href = `/delete?id=${todoID}`;
});

const renderTodos = (arr) => {
  $(".card-container").html("");
  arr.forEach((todo) => {
    let msg = todo.completed
      ? "✅ &nbsp; Finished todo"
      : "❌ &nbsp; Need to do";
    $(".card-container").prepend(
      `
      <div class="card mb-2">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">
            ${msg}
          </h6>
          <p class="card-text">
            ${todo.text}
          </p>

          <div class="text-center">
            <button
              id="btnUpdate" 
              data-id=${todo.id}
              style="width: 150px;"
              class="btn btn-outline-success mr-2"
            >
              Edit
            </button>
            <button
              id="btnDelete" 
              data-id=${todo.id}
              style="width: 150px;"
              class="btn btn-outline-danger ml-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    `
    );
  });
};
