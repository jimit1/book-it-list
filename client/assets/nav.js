$(document).ready(function () {
  let settings = "";
  let feed = "";
  let members = "";
  let newpost = "";
  let userEmail = "";
  let userName = "";

  if (window.location.pathname !== "/settings") {
    settings = `  <li>
    <div class="collapsible-header">
      <a href="./settings"><i class="material-icons">settings</i>SETTINGS</a>
    </div>
    </li>`;
  }

  if (window.location.pathname !== "/feed") {
    feed = `  <li>
<div class="collapsible-header">
  <a href="./feed"><i class="material-icons">home</i>Feed</a>
</div>
</li>`;
  }

  if (window.location.pathname !== "/members") {
    members = `  <li>
  <div class="collapsible-header">
    <a href="./members"><i class="material-icons">account_circle</i>MEMBERS</a>
  </div>
  </li>`;
  }

  if (window.location.pathname !== "/newpost") {
    newpost = `
  <li>
    <div class="collapsible-header card-panel light-blue darken-4">
      <a href="./newpost" style="color: white;">
        <i class="material-icons white-text">add</i>CREATE POST</a>
        </span>
    </div>
  </li>`;
  }

  const topNav = `<nav class="white my-nav" role="navigation">
  <div class="nav-wrapper container">
    <a
      id="logo-container"
      href="index.html"
      class="brand-logo left retro-shadow"
      >BOOK IT!</a
    >
  </div>
</nav>`;

  const popOut = `  <li>
<div class="user-view">
  <div class="background">
    <img class="img-responsive" src="/img/bgr-everest2.jpg" />
  </div>
  <a href="#user"><img id="navatar" class="circle" src="#" /></a>

  <span id="userName" class="white-text name size-4"
    ></span
  >
  <span id="userEmail" class="white-text email"></span>
</div>
</li>`;

  const logout = `  <li>
<div class="collapsible-header">
  <a href="./logout"><i class="material-icons">cloud</i>LOG OUT</a>
</div>
</li>`;
  const loadNavbar = () => {
    $(".navbargoeshere").html(`${topNav}

  <ul id="slide-out" class="sidenav collapsible popout">
   ${popOut}
  ${feed}
  ${members}
  ${settings}
  ${logout}
  ${newpost}
  
  </ul>
  
  <div class="row">
    <div class="container">
      <div class="signup-nav">
        <a href="#" data-target="slide-out" class="sidenav-trigger"
          ><i class="material-icons small">account_circle</i></a
        >
      </div>
    </div>
  </div>`);
  };

  const loadFooter = () => {
    $(".footergoeshere").html(`<footer class="page-footer teal">
    <div class="footer-copyright">
      <div class="container">
        Made by
      <a class="brown-text text-lighten-3" href="#">UCB Coding BootCamp</a>
      </div>
    </div>
  </footer>`);
  };

  loadNavbar();
  loadFooter();

  $.ajax({
    type: "GET",
    url: "/api/user_data",
  })
    .then((res) => {
      userName = res.userName;
      userId = parseInt(res.id);
      userEmail = res.email;
    })
    .then(() => {
      $.ajax({
        type: "GET",
        url: `/api/seeSettings/${userId}`,
      }).then((res) => {
        JSON.parse(res[0].mode)
          ? $("body").attr("style", "background-color: white; color:black;")
          : $("body").attr("style", "background-color: black; color:white;");
        $("body").attr("id", res[0].font);
        $("#navatar").attr("src", res[0].profileUrl);
        $("#userName").text(userName);
        $("#userEmail").text(userEmail);
      });
    });
});
