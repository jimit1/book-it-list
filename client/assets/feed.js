$(document).ready(function () {
  let userID;
  let userName;
  let userEmail;

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
    renderTodos(res);
  });

  // define the render function
  const renderTodos = (arr) => {
    console.log(arr);
    $(".card-container").html("");
    arr.forEach((todo) => {
      $("#userName").prepend(`${todo.userName}`);
      $(".card-container").prepend(`
      <div class="row">
        <div class=" col s12 m10 offset-m1"">
          
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
      //     `
      //   Jim added an item to ${todo.category}
      //   <div class="row">
      //     <div class="col s12 m10 offset-m1" >
      //       <h5>card reveal with carousel</h5>
      //       <div class="card">
      //         <div class="card-image waves-effect waves-block waves-light">
      //           <div class="carousel carousel-slider center">
      //             <div class="carousel-item red white-text" href="#one!">
      //               <img class="activator" src="${todo.imgURL}" />
      //             </div>
      //           </div>
      //         </div>
      //         <div class="card-content">
      //           <span class="card-title activator grey-text text-darken-4"
      //             >Visit Paris<i class="material-icons right">more_vert</i></span
      //           >
      //           <p><a href="#">${user}</a></p>
      //         </div>
      //         <div class="card-reveal">
      //           <span class="card-title grey-text text-darken-4"
      //             >${todo.title}<i class="material-icons right">close</i></span
      //           >
      //           <p>
      //             ${todo.details}
      //             <br>
      //             ${todo.imptURL}

      //           </p>

      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // `
    });
  };
});
