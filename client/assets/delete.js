// $(document).ready(function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const id = urlParams.get("id");

//   $.ajax({
//     type: "GET",
//     url: `/api/find/${id}`,
//   }).then((res) => $("#deleteTodoText").text(res[0].text));

//   $("#cancelBtn").on("click", () => {
//     console.log("Works");
//     window.location.href = "/";
//   });

//   $("#deleteBtn").on("click", () => {
//     console.log("Works");
//     $.ajax({
//       type: "DELETE",
//       url: `/api/delete/${id}`,
//     }).then((res) => {
//       console.log(res);
//     });
//     window.location.href = "/";
//   });
// });
