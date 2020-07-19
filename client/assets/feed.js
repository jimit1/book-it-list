$(document).ready(function () {
  let userID;
  let userName;
  let userEmail;
  $(".collapsible").collapsible();

  // get the user currently logged in
  $.ajax({
    type: "GET",
    url: "/api/user_data",
  }).then((user) => {
    console.log(user.userName);
    userID = user.id;

    userName = user.userName;
    userEmail = user.email;
  });

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
  getTodos().then((res) => {
    renderListView(res);
  });

  // define the render function
  const renderListView = (arr) => {
    $(".collapsible").collapsible();

    $(".card-container").html("");
    $(".card-container").html(`<ul id="listView" class="collapsible"></ul>`);
    arr.forEach((todo) => {
      $("#userName").prepend(`${todo.userName}`);

      $("#listView").prepend(`
    
            <li>
              <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
              <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
       
     
      `);
    });
  };

  const renderCardView = (arr) => {
    console.log(arr);
    $(".card-container").html("");
    arr.forEach((todo) => {
      $("#userName").prepend(`${todo.userName}`);
      $(".card-container").prepend(`
      <div class="row">
        <div class=" col s12 m10 offset-m1">
          
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
              
              <p class="userName">Posted by: ${todo.userName}</p>

            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"
                >${todo.title}<i class="material-icons right">close</i></span
              >
              <p class="details">Details:</p>
              <p>${todo.details}
              </p>
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

// <li>
//   <div class="collapsible-header">
//     <i class="material-icons">filter_drama</i>${todo.title}
//   </div>
//   <div class="collapsible-body">
//     <span>${todo.details}</span>
//   </div>
// </li>;
