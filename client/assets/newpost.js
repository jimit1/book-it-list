$(document).ready(function () {
  $("select").formSelect();
  $("input#input_text, input#title").characterCounter();
  $("input#input_text, textarea#details").characterCounter();
  $(".modal").modal();
  $("#searchBtn").hide();

  const instance = M.Modal.getInstance(modal1);

  // sets up req.params style way to access info
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  const postIdNum = parseInt(postId);
  let userId;

  $.ajax({
    type: "GET",
    url: "/api/user_data",
  }).then((res) => {
    console.log(res.id);
    if (res.id === undefined) {
      window.location.href = "/";
    } else {
      userId = res.id;
      console.log("after GET request: ", userId);
    }
  });

  console.log("below ajax request: ", userId);
  // conditional: if id != null, then..
  // use an api route to get the post using the id variable above
  // set each element's .val() using res from the ajax request

  // if (id != null) {
  //   console.log(postIdNum);
  //   $.ajax({
  //     type: "GET",
  //     url: `TBD/${idNum}`, // TDB
  //   }).then((res) => {
  //     $("#category").val(res.category);
  //     $("#title").val(res.title);
  //     $("#details").val(res.details);
  //     $("#imgURL").val(res.imgURL);
  //     $("#imptURL").val(res.imptURL);
  //   });
  // }

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
    if ($("#category").val() == 3) {
      $("#searchBtn").show();
    } else {
      $("#searchBtn").hide();
    }
  });

  $("#searchBtn").on("click", () => {
    if ($("#title").val() === "") {
      instance.open();
    } else {
      if ($("#category").val() == 3) {
        // search omdb for the title entered
        console.log($("#title").val());
        $.ajax({
          type: "GET",
          // need to figure out how to hide the key using .env fe8b2a76
          url: `http://www.omdbapi.com/?apikey=fe8b2a76&t=${$("#title").val()}`,
        }).then((res) => {
          console.log(res);
          $("#details").val(`Plot: ${res.Plot}\n
IMDB Rating: ${res.imdbRating}/10\n
Rotten Tomatoes: ${res.Ratings[1].Value}\n
Released: ${res.Year}\n
Director(s): ${res.Director}`);

          $("#imgURL").val(res.Poster);
        });
      }
    }
  });

  $("#btnSubmit").on("click", () => {
    post.userId = userId;
    post.category = $("#category").val();
    post.title = $("#title").val();
    post.details = $("#details").val();
    post.imageURL = $("#imgURL").val();
    post.imptURL = $("#imptURL").val();

    if (
      $("#category").val() === null ||
      $("#title").val() === "" ||
      $("#details").val() === "" ||
      $("#imgURL").val() === "" ||
      post.title.length > 100 ||
      post.details.length > 500
    ) {
      instance.open();
    } else {
      // add a conditional to check if the id in the url is null
      // if it is, submit a new post,
      // if it isn't, postID = id submit edit post

      console.log(post);
      $.ajax({
        type: "POST",
        url: "/api/add",
        data: post,
      }).then((res) => {
        console.log(res);
      });

      // window.location.href = "/feed";
    }
  });

  $("#cancel").on("click", () => {
    window.location.href = "/feed";
  });
});
