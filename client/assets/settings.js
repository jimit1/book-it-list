// $(document).ready(function () {
//   let userIdentity;
//   $.ajax({
//     type: "GET",
//     url: "/api/user_data",
//   })
//     .then((res) => {
//       userIdentity = res.id;
//     })
//     .then(() => {
//       console.log(userIdentity);
//       $.ajax({
//         type: "GET",
//         url: `/api/allSettings`,
//       }).then((res) => {
//         console.log(res);
//       });
//     });
// });
