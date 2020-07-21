$(document).ready(function () {
  const emailInput = $("#loginEmailInput");
  const pwInput = $("#loginPwInput");

  $("#loginSubmit").on("click", () => {
    const User = {
      email: emailInput.val().trim(),
      password: pwInput.val().trim(),
    };

    $.ajax({
      type: "POST",
      url: "/api/login",
      data: User,
    }).then(() => {
      window.location.replace("/feed");
    });
  });
});
