$(document).ready(function () {
  const emailInput = $("#loginEmailInput");
  const pwInput = $("#loginPwInput");

  $("#loginSubmit").on("click", () => {
    console.log("clicked");
    const User = {
      email: emailInput.val().trim(),
      password: pwInput.val().trim(),
    };

    $.ajax({
      type: "POST",
      url: "/api/login",
      data: User,
    }).then(() => {
      //from Client Routes
      window.location.replace("/feed");
    });
  });
});
