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
      console.log(userID);
      userName = user.userName;
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
        url: `/api/find?userId=${userID}`,
      }).then((res) => {
        resolve(res);
      });
    });
  };

  // run the getTodos function, then run the render function with the result

  // define the render function
  const renderTodos = (arr) => {
    console.log(arr);

    $(".card-container").html("");
    arr.forEach((todo) => {
      $(".card-container").prepend(`
      <div class="row">
        <div class="container col s12 m10 offset-m1" style="margin-top: 5rem;">
          <h5>card reveal with carousel</h5>
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <div class="carousel carousel-slider center">
                <!-- div w/ img tag for img1 -->
                <!-- <div class="carousel-item red white-text" href="#one!"> -->
                  <img class="activator" src="${todo.imageURL}" />
                <!-- </div> -->
                <!-- div needs img tag for img2 -->
                <!-- <div class="carousel-item amber white-text" href="#two!">
                  <img class="activator" src="#" />
                </div> -->
              </div>
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4"
                >${todo.title}<i class="material-icons right">more_vert</i></span
              >
              <p><a class="userName">User Name</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"
                >Card Title<i class="material-icons right">close</i></span
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
        <p>${todo.details} <br>
        </p>
        <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
      </li>     `);
    });
  };
});
