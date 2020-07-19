$(document).ready(function () {
  $("select").formSelect();
  $("input#input_text, input#title").characterCounter();
  $("input#input_text, textarea#details").characterCounter();
  $(".modal").modal();
  $("#searchBtn").hide();
  $("#title").focus();

  const instance = M.Modal.getInstance(modal1);

  // sets up req.params style way to access info
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  const postIdNum = parseInt(postId);
  let userId;

  $.ajax({
    type: "GET",
    url: "/api/user_data",
  }).then((res) => (userId = res.id));

  // if this is an update..
  if (postId != null) {
    // .. enable the delete button
    $("#delete").attr("class", "waves-effect waves-light btn");
    console.log(postIdNum);

    // .. and get the post using it's ID
    $.ajax({
      type: "GET",
      url: `/api/findpost/${postIdNum}`,
    }).then((res) => {
      console.log("from findpost request", res);
      // Set the form up with values from the request
      $("#category").val(res[0].category);
      $("#title").val(res[0].title);
      $("#details").val(res[0].details);
      $("#imgURL").val(res[0].imageURL);
      $("#imptURL").val(res[0].imptURL);
      $("#form-img").attr("src", res[0].imageURL);
      $("select").formSelect();
      M.textareaAutoResize($("#details"));
      $("#category").on("load", () => {});
      if (res[0].category == "movies") {
        $("#searchBtn").show();
      }
    });

    // otherwise, disable the delete button
  } else {
    $("#delete").attr("class", "waves-effect waves-light btn disabled");
  }

  let post = {
    userId: "",
    category: "",
    title: "",
    details: "",
    imageURL: "",
    imptURL: "",
  };

  // Materialize returns a STRING number for .val()
  $("#category").on("change", () => {
    $("#searchBtn").show();
  });

  $("#previewBtn").on("click", () => {
    $("#form-img").attr("src", $("#imgURL").val());
  });

  $("#searchBtn").on("click", () => {
    if ($("#title").val() === "") {
      instance.open();
    } else {
      // if the category is 'movies'

      if ($("#category").val() == "movies") {
        $.ajax({
          type: "GET",
          url: `/api/omdb/${$("#title").val()}`,
        }).then((res) => {
          $("#details").val(
            `Plot: ${res.Plot}\nIMDB Rating: ${res.imdbRating}/10\nRotten Tomatoes: ${res.Ratings[1].Value}\nReleased: ${res.Year}\nDirector(s): ${res.Director}`
          );
          $("#imgURL").val(res.Poster);
          $("#form-img").attr("src", res.Poster);
          M.textareaAutoResize($("#details"));
        });
      }

      // if the category is 'places'

      if ($("#category").val() == "places") {
        $.ajax({
          type: "GET",
          url: `/api/unsplash/${$("#title").val()}`,
        }).then((res) => {
          console.log(res);
          $("#details").val(res.results[0].alt_description);
          $("#imgURL").val(res.results[0].urls.full);
          $("#form-img").attr("src", res.results[0].urls.full);
          M.textareaAutoResize($("#details"));
        });
      }

      // if the category is 'food'

      if ($("#category").val() == "food") {
        $.ajax({
          type: "GET",
          url: `/api/unsplash/${$("#title").val()}`,
        }).then((res) => {
          console.log(res);
          $("#details").val(res.results[0].alt_description);
          $("#imgURL").val(res.results[0].urls.full);
          $("#form-img").attr("src", res.results[0].urls.full);
          M.textareaAutoResize($("#details"));
        });
      }

      // if the category is 'things'
      if ($("#category").val() == "things") {
        $.ajax({
          type: "GET",
          url: `/api/unsplash/${$("#title").val()}`,
        }).then((res) => {
          console.log(res);
          $("#details").val(res.results[0].alt_description);
          $("#imgURL").val(res.results[0].urls.full);
          $("#form-img").attr("src", res.results[0].urls.full);
          M.textareaAutoResize($("#details"));
        });
      }
    }
  });

  // When the submit button is clicked..
  $("#btnSubmit").on("click", () => {
    // set the values for the post object
    post.userId = userId;
    post.category = $("#category").val();
    post.title = $("#title").val();
    post.details = $("#details").val();
    post.imageURL = $("#imgURL").val();
    post.imptURL = $("#imptURL").val();

    // If any required fields are blank..
    if (
      $("#category").val() === null ||
      $("#title").val() === "" ||
      $("#details").val() === "" ||
      $("#imgURL").val() === "" ||
      post.title.length > 100 ||
      post.details.length > 500
    ) {
      // show the modal
      instance.open();
      // otherwise..
    } else {
      // if there isn't a post ID..
      if (postId === null) {
        console.log("no id");
        console.log(post);

        // ..submit a new post

        $.ajax({
          type: "POST",
          url: "/api/add",
          data: post,
        }).then((res) => {
          M.toast({ html: "Successfully submitted new post" });
          setTimeout(() => window.location.replace("/feed"), 1500);
        });

        // ..otherwise..
      } else {
        // ..get the postId and add it to the post object
        post.postId = postIdNum;
        console.log(post);

        // ..then submit an update

        $.ajax({
          type: "PATCH",
          url: "/api/update",
          data: post,
        }).then((res) => {
          M.toast({ html: "Successfully updated post" });
          setTimeout(() => window.location.replace("/feed"), 1500);
        });
      }
    }
  });

  // a simple redirect, does nothing else
  $("#cancel").on("click", () => window.location.replace("/feed"));

  // this works so long as the URL is:
  // 'localhost:3000/newpost?id=' and a valid post ID (valid in your db)
  $("#delete").on("click", () => {
    post.postId = postIdNum;
    $.ajax({
      type: "DELETE",
      url: "/api/delete",
      data: post,
    }).then((res) => {
      M.toast({ html: "Successfully deleted post" });
      setTimeout(() => window.location.replace("/feed"), 1500);
    });
  });
});
