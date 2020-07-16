$(document).ready(function () {
  const emailInput = $("#emailInput");
  const pwInput = $("#pwInput");
  const unInput = $("#unInput");

  $("#signupSubmit").on("click", () => {
    console.log("clicked");
    const User = {
      email: emailInput.val().trim(),
      password: pwInput.val().trim(),
      userName: unInput.val().trim(),
    };

    $.ajax({
      type: "POST",
      url: "/api/signup",
      data: User,
    }).then(() => {
      window.location.replace("/feed");
    });
  });
});
