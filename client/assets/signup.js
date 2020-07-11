$(document).ready(function () {
  const signupForm = $("#signupForm");
  const emailInput = $("#emailInput");
  const pwInput = $("#pwInput");

  signupForm.on("submit", function (e) {
    e.preventDefault();

    const User = {
      email: emailInput.val().trim(),
      password: pwInput.val().trim(),
    };

    $.ajax({
      type: "POST",
      url: "/api/signup",
      data: User,
    }).then(() => {
      window.location.replace("/");
    });
  });
});
