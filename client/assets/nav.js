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
  <a href="./feed"><i class="material-icons">list</i>ALL POSTS</a>
</div>
</li>`;
  }

  if (window.location.pathname !== "/members") {
    members = `  <li>
  <div class="collapsible-header">
    <a href="./members"><i class="material-icons">home</i>HOME</a>
  </div>
  </li>`;
  }

  if (window.location.pathname !== "/newpost") {
    newpost = `
  <li>
    <div class="collapsible-header card-panel light-blue darken-4">
      <a href="./newpost">
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
      <a class="white-text" href="https://www.linkedin.com/in/mathew-wilmot-937738174/">Mat Wilmot</a>, 
      <a class="white-text" href="https://www.linkedin.com/in/sosukebrause/">Sosuke Brause</a>, 
      <a class="white-text" href="https://www.linkedin.com/in/llee2018/">Louise Lee</a>, 
      and <a class="white-text" href="https://www.linkedin.com/in/jimmehta/">Jim Mehta</a>
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
        JSON.parse(res[0].mode) ? lightMode() : darkMode();
        $("body").attr("id", res[0].font);
        $("#navatar").attr("src", res[0].profileUrl);
        $("#userName").text(userName);
        $("#userEmail").text(userEmail);
      });
    });
});

const lightMode = () => {
  $("body").attr("class", "light-mode");
  $(".activator").attr(
    "class",
    "card-title activator grey-text text-darken-4 light-mode"
  );
  $(".grab-mode").attr(
    "class",
    "card-title grab-mode grey-text text-darken-4 light-mode"
  );
  $(".card-content").attr("class", "card-content light-mode");
  $(".validate").attr("class", "validate valid light-mode");
  $("#font-choice").attr("class", "light-mode");
  $(".dropdown-trigger").attr(
    "class",
    "select-dropdown dropdown-trigger light-mode"
  );
  $(".my-nav").attr("class", "my-nav white");
  $("#slide-out").attr("class", "sidenav collapsible popout light-mode");
  $(".carousel").attr("class", "carousel carousel-slider center light-mode");
  $(".dropdown-content").attr(
    "class",
    "dropdown-content select-dropdown light-mode"
  );
  $(".collapsible-header").attr("class", "collapsible-header light-mode");

  $(".card").attr("class", "card light-mode");
  $(".card-reveal").attr("class", "card-reveal light-mode");
};

const darkMode = () => {
  $("body").attr("class", "dark-mode");
  $(".activator").attr(
    "class",
    "card-title activator white-text text-lighten-4 dark-mode"
  );
  $(".grab-mode").attr(
    "class",
    "card-title grab-mode white-text text-lighten-4 dark-mode"
  );
  $(".card-content").attr("class", "card-content dark-mode");
  $(".validate").attr("class", "validate valid dark-mode");
  $("#font-choice").attr("class", "dark-mode");
  $(".dropdown-trigger").attr(
    "class",
    "select-dropdown dropdown-trigger dark-mode"
  );
  $(".my-nav").attr("class", "my-nav grey darken-4");
  $("#slide-out").attr("class", "sidenav collapsible popout dark-mode");
  $(".carousel").attr("class", "carousel carousel-slider center dark-mode");
  $("#font-choice").attr("class", "dark-mode");
  $(".dropdown-content").attr(
    "class",
    "dropdown-content select-dropdown dark-mode"
  );
  $(".collapsible-header").attr("class", "collapsible-header dark-mode");

  $(".card").attr("class", "card dark-mode");
  $(".card-reveal").attr("class", "card-reveal dark-mode");
};
