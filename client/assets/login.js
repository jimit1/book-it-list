$(document).ready(function () {
  const loginForm = $("#loginForm");
  const emailInput = $("#loginEmailInput");
  const pwInput = $("#loginPwInput");

  loginForm.on("submit", function (e) {
    e.preventDefault();

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
