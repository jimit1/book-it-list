$(document).ready(function () {
  let userID;
  let userName;
  let userEmail;
  $(".collapsible").collapsible();

  // get the user currently logged in
  $.ajax({
    type: "GET",
    url: "/api/user_data",
  })
    .then((user) => {
      userID = user.id;
      userName = user.userName;
      userEmail = user.email;
      $("#userName").text(user.userName);
      $("#userEmail").text(user.email);
      console.log(user);
    })
    .then(() => {
      $.ajax({
        type: "GET",
        url: `api/seeSettings/${userID}`,
      }).then((res) => {
        if (res[0].view === "card-view") {
          getTodos().then((res) => {
            renderCardView(res);
          });
        } else if (res[0].view === "list-view") {
          getTodos().then((res) => {
            renderListView(res);
          });
        }
      });
    });

  // get current user's settings

  // create a function to return all todos from DB
  const getTodos = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: "/api/all",
      }).then((res) => {
        resolve(res);
        console.log(res);
      });
    });
  };

  // run the getTodos function, then run the render function with the result
  // getTodos().then((res) => {
  //   renderListView(res);
  // });

  // define the render function
  const renderListView = (arr) => {
    $(".card-container").html("");
    $(".card-container").html(`<ul id="listView" class="collapsible"></ul>`);
    arr.forEach((todo) => {
      $("#listView").prepend(`
        <li>
        <span class="card-title activator grey-text text-darken-4"> 
        <div class="collapsible-header">
            <h5>${todo.userName} added '${todo.title}' to their '${todo.category}' list!</h5>
          </div>
        </span>
          
          <div class="collapsible-body">
            <div class="carousel carousel-slider center">
              <img class="activator" src="${todo.imageURL}" />
            </div>
            <div class="flow-text">
              <p class="details">Details:</p>
              <p> ${todo.details}</p>
              <p>Additional URL(s):</p>
              <p class="imptURL">${todo.imptURL}</p>
            </div>
          </div>
        </li>`);
    });
    $(".collapsible").collapsible();
  };

  const renderCardView = (arr) => {
    console.log(arr);
    $(".card-container").html("");
    arr.forEach((todo) => {
      $(".card-container").prepend(`
      <div class="row">
        <div class="col s12 m10 offset-m1">
          
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

              <p class="userName">Posted by ${todo.userName} in the '${todo.category}' category</p>

            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4 grab-mode"
                >${todo.title}<i class="material-icons right">close</i></span
              >
              <p class="details">Details:</p>
              <p>${todo.details}</p>
              <p>Additional URL(s):</p>
              <p class="imptURL">${todo.imptURL}</p>
            </div>
          </div>
        </div>
      </div>
      `);
    });
  };
});
