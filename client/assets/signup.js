$(document).ready(function () {
  const emailInput = $("#emailInput");
  const pwInput = $("#pwInput");
  const unInput = $("#unInput");

  $("#signupSubmit").on("click", () => {
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
      $.ajax({
        type: "GET",
        url: "/api/user_data",
      }).then((res) => {
        $.ajax({
          type: "POST",
          url: "/api/addSettings",
          data: {
            userId: res.id,
            profileUrl: `https://api.adorable.io/avatars/250/${res.userName}.png`,
            mode: false,
            font: "font-rb",
            view: "card-view",
          },
        }).then((res) => {
          // window.location.replace("/feed");
        });
      });
    });
  });
});
