$(document).ready(function () {
  const signupForm = $("#signupForm");
  const emailInput = $("#emailInput");
  const pwInput = $("#pwInput");
  const unInput = $("#unInput");

  signupForm.on("submit", function (e) {
    e.preventDefault();

    const User = {
      email: emailInput.val().trim(),
      password: pwInput.val().trim(),
      userName: unInput.val().trim(),
    };

    console.log(User);

    $.ajax({
      type: "POST",
      url: "/api/signup",
      data: User,
    }).then(() => {
      window.location.replace("/feed");
    });
  });
});
