$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/",
  }).then((user) => {
    console.log("/");
    $("#userId").text(user.id);
  });
  getTodos().then((res) => {
    renderTodos(res);
  });
  const getTodos = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: "/api/all",
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => console.log(err));
    });
  };
  const renderTodos = (arr) => {
    $(".card-container").html("");
    arr.forEach((todo) => {
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
});
