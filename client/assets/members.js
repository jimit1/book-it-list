$(document).ready(function () {
  let userID;
  let userName;
  let userEmail;

  // get the user currently logged in
  $.ajax({
    type: "GET",
    url: "/api/user_data",
  })
    .then((user) => {
      console.log(user.id);
      userID = user.id;
      userName = user.userName;
      console.log(userName);
      userEmail = user.email;
    })
    .then(() => {
      getTodos().then((res) => {
        renderTodos(res);
      });
    });

  // create a function to return all todos from DB
  const getTodos = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: `/api/find/${userID}`,
      }).then((res) => {
        resolve(res);
        console.log(res);
      });
    });
  };

  // run the getTodos function, then run the render function with the result

  // define the render function
  const renderTodos = (arr) => {
    console.log(arr);

    $(".card-container").html("");
    arr.forEach((todo) => {
      console.log(todo);

      $(".card-container").prepend(`
      <div class="row">
        <div class="container col s12 m10 offset-m1" style="margin-top: 5rem;">
          <h5>Added to: ${todo.category}</h5>
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <div class="carousel carousel-slider center">
                <img class="activator" src="${todo.imageURL}" />
              </div>
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4"
                >${todo.title}<i class="material-icons right">more_vert</i></span
              >
              <p><a class="userName">${todo.userName}</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"
                >${todo.title}<i class="material-icons right">close</i></span
              >
              <p class="details">
                ${todo.details}
              </p> <br>
              <p class="imptURL">${todo.imptURL}</p>
            </div>
          </div>
        </div>
      </div>
      `);

      // collection list

      $(".collection").prepend(`
      <li class="collection-item avatar">
        <i class="material-icons circle">format_bold
</i>
        <span class="collection-title">${todo.title}</span>
        <p>In: ${todo.category} <br>
        </p>
        <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
      </li>     `);
    });
  };
});
