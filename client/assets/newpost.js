$(document).ready(function () {
  $("select").formSelect();
  $("input#input_text, input#title").characterCounter();
  $("input#input_text, textarea#details").characterCounter();
  $(".modal").modal();

  const instance = M.Modal.getInstance(modal1);

  let newpost = {
    category: "",
    title: "",
    details: "",
    imgURL: "",
    imptURL: "",
  };

  $("#btnSubmit").on("click", () => {
    newpost.category = $("#category").val();
    newpost.title = $("#title").val();
    newpost.details = $("#details").val();
    newpost.imgURL = $("#imgURL").val();
    newpost.imptURL = $("#imptURL").val();

    if (
      $("#category").val() === null ||
      $("#title").val() === "" ||
      $("#details").val() === "" ||
      $("#imgURL").val() === ""
    ) {
      instance.open();
    } else {
      console.log(newpost);

      // submitFunction(newpost);
      // redirect to home page
    }
  });

  $("#cancel").on("click", () => {
    window.location.href = "/home.html";
  });
});
