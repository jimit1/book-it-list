connection = require("./connection");

// Object Reference Module

// connection.query(
//   `CREATE TABLE IF NOT EXISTS settings (
//   userId INT NOT NULL,
//   profileUrl VARCHAR(200),
//   mode VARCHAR(15),
//   font VARCHAR(50),
//   view VARCHAR(15),
//   PRIMARY KEY (userId)
// )`,
//   (err) => {
//     if (err) throw err;
//   }
// );

// const addSettings = (obj) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       "INSERT INTO settings SET ?",
//       [
//         {
//           userId: obj.userId,
//           profileUrl: obj.profileUrl,
//           mode: obj.mode,
//           font: obj.font,
//           view: obj.view,
//         },
//       ],
//       (err) => {
//         err ? reject(err) : resolve("Success");
//       }
//     );
//   });
// };

// const seeSettings = (userIdentity) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `SELECT * FROM settings WHERE ?`,
//       [{ userId: userIdentity }],
//       (err, data) => {
//         err ? reject(err) : resolve(data);
//       }
//     );
//   });
// };

// const updateSettings = (obj) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       "UPDATE settings SET ? WHERE ?",
//       [
//         {
//           profileUrl: obj.profileUrl,
//           mode: obj.mode,
//           font: obj.font,
//           view: obj.view,
//         },
//         { userId: obj.userId },
//       ],
//       (err) => {
//         err ? reject(err) : resolve("Success");
//       }
//     );
//   });
// };

// module.exports = { addSettings, seeSettings, updateSettings };
