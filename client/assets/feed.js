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
      Jim added an item to ${todo.category}
      <div class="row">
        <div class="col s12 m10 offset-m1" >
          <h5>card reveal with carousel</h5>
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <div class="carousel carousel-slider center">
                <div class="carousel-item red white-text" href="#one!">
                  <img class="activator" src="${todo.imgURL}" />
                </div>              
              </div>
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4"
                >Visit Paris<i class="material-icons right">more_vert</i></span
              >
              <p><a href="#">${user}</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"
                >${todo.title}<i class="material-icons right">close</i></span
              >
              <p>
                ${todo.details}
                <br>
                ${todo.imptURL}

              </p>

            </div>
          </div>
        </div>
      </div>
    `
      );
    });
  };
});
