$(document).ready(function () {
  let userID;
  let userName;
  let userEmail;
  let postId;

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
        console.log(res);
        renderTodos(res[res.length - 1]);
        renderListView(res);
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
      });
    });
  };

  const getOnePost = (pId) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: `/api/findpost/${pId}`,
      }).then((res) => {
        resolve(res);
      });
    });
  };

  $(document).on("click", ".collapsible-header", function () {
    postId = $(this).attr("post-id");
    getOnePost(postId)
      .then((res) => {
        console.log(res);
        renderTodos(res[0]);
      })
      .then(() => {
        $.ajax({
          type: "GET",
          url: `/api/seeSettings/${userId}`,
        }).then((res) => {
          JSON.parse(res[0].mode) ? lightModeHere() : darkModeHere();
        });
      });
  });

  const renderListView = (arr) => {
    $(".left-box").html("");
    $(".left-box").html(`<ul id="listView" class="collapsible"></ul>`);
    arr.forEach((todo) => {
      $("#listView").prepend(`
        <li>
        <span class="card-title activator grey-text text-darken-4"> 
        <div class="collapsible-header" post-id="${todo.postid}">
            ${todo.userName} added '${todo.title}' to their '${todo.category}' list!
          </div>
        </span>
          
          <div class="collapsible-body">
            <div>
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

  // run the getTodos function, then run the render function with the result

  // define the render function
  const renderTodos = (todo) => {
    // console.log(arr);

    $(".main-box").html("");
    // arr.forEach((todo) => {
    // console.log(todo);

    $(".main-box").prepend(`
      <div class="row">
        <div class="container col s12 m10 offset-m1" >
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
              <span class="card-title grey-text text-darken-4 grab-mode"
                >${todo.title}<i class="material-icons right">close</i></span
              >
              <p class="details">
                ${todo.details}
              </p> <br>
              <p class="imptURL">${todo.imptURL}</p>

              <a href="/newpost?id=${todo.postid}"><i class="material-icons">edit</i>Update</a>

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
    // });
  };
});

const lightModeHere = () => {
  $("body").attr("class", "light-mode");
  $(".activator").attr(
    "class",
    "card-title activator grey-text text-darken-4 light-mode"
  );
  $(".grab-mode").attr(
    "class",
    "card-title grab-mode grey-text text-darken-4 light-mode"
  );
  $(".card-content").attr("class", "card-content light-mode");
  $(".validate").attr("class", "validate valid light-mode");
  $("#font-choice").attr("class", "light-mode");
  $(".dropdown-trigger").attr(
    "class",
    "select-dropdown dropdown-trigger light-mode"
  );
  $(".my-nav").attr("class", "my-nav white");
  $("#slide-out").attr("class", "sidenav collapsible popout light-mode");
  $(".carousel").attr("class", "carousel carousel-slider center light-mode");
  $(".dropdown-content").attr(
    "class",
    "dropdown-content select-dropdown light-mode"
  );
  $(".collapsible-header").attr("class", "collapsible-header light-mode");

  $(".card").attr("class", "card light-mode");
  $(".card-reveal").attr("class", "card-reveal light-mode");
};

const darkModeHere = () => {
  $("body").attr("class", "dark-mode");
  $(".activator").attr(
    "class",
    "card-title activator white-text text-lighten-4 dark-mode"
  );
  $(".grab-mode").attr(
    "class",
    "card-title grab-mode white-text text-lighten-4 dark-mode"
  );
  $(".card-content").attr("class", "card-content dark-mode");
  $(".validate").attr("class", "validate valid dark-mode");
  $("#font-choice").attr("class", "dark-mode");
  $(".dropdown-trigger").attr(
    "class",
    "select-dropdown dropdown-trigger dark-mode"
  );
  $(".my-nav").attr("class", "my-nav grey darken-4");
  $("#slide-out").attr("class", "sidenav collapsible popout dark-mode");
  $(".carousel").attr("class", "carousel carousel-slider center dark-mode");
  $("#font-choice").attr("class", "dark-mode");
  $(".dropdown-content").attr(
    "class",
    "dropdown-content select-dropdown dark-mode"
  );
  $(".collapsible-header").attr("class", "collapsible-header dark-mode");

  $(".card").attr("class", "card dark-mode");
  $(".card-reveal").attr("class", "card-reveal dark-mode");
};
