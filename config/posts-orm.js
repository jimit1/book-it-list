connection = require("./connection");

// Object Reference Module

connection.connect((err) => {
  if (err) throw err;
});

// connection.query(
//   `CREATE TABLE IF NOT EXISTS posts (
//   postid INT NOT NULL AUTO_INCREMENT,
//   userId INT NOT NULL,
//   category VARCHAR(80) NOT NULL,
//   title VARCHAR(200) NOT NULL,
//   details VARCHAR(500) NOT NULL,
//   imageURL VARCHAR(200) NOT NULL,
//   imptURL VARCHAR(200),
//   PRIMARY KEY (postid)
// )`,
//   (err) => {
//     if (err) throw err;
//   }
// );

// connection.query(
//   `CREATE TABLE IF NOT EXISTS Users (
// 	id INT NOT NULL AUTO_INCREMENT,
//     email VARCHAR(100) NOT NULL,
//     password VARCHAR(500) NOT NULL,
//     userName VARCHAR(100) NOT NULL,
//     createdAt VARCHAR (100),
//     updatedAt VARCHAR (100),
//     PRIMARY KEY (id)
// );`,
//   (err) => {
//     if (err) throw err;
//   }
// );

// const createUser = (newUserObj) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       "INSERT INTO users SET ?",
//       [
//         {
//           email: newUserObj.email,
//           password: newUserObj.password,
//           userName: newUserObj.userName,
//         },
//       ],
//       (err) => {
//         err ? reject(err) : resolve("success");
//       }
//     );
//   });
// };

// const seeAllPosts = () => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `SELECT * FROM posts
//     LEFT JOIN users ON
//     users.id = posts.userId`,
//       (err, data) => {
//         err ? reject(err) : resolve(data);
//       }
//     );
//   });
// };

// const userPost = (userIdInput) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `SELECT postid, userId, category, title, details, imageURL, imptURL, userName FROM posts
//       LEFT JOIN users ON
//       users.id = posts.userId WHERE ?`,
//       [{ userId: userIdInput }],
//       (err, data) => {
//         err ? reject(err) : resolve(data);
//       }
//     );
//   });
// };

// const userOnePost = (postId) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `SELECT postid, userId, category, title, details, imageURL, imptURL, userName FROM posts
//       LEFT JOIN users ON
//       users.id = posts.userId WHERE ?`,
//       [{ postid: postId }],
//       (err, data) => {
//         err ? reject(err) : resolve(data);
//       }
//     );
//   });
// };

// const addPost = (obj) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       "INSERT INTO posts SET ?",
//       [
//         {
//           userId: obj.userId,
//           category: obj.category,
//           title: obj.title,
//           details: obj.details,
//           imageURL: obj.imageURL,
//           imptURL: obj.imptURL,
//         },
//       ],
//       (err) => {
//         err ? reject(err) : resolve("Success");
//       }
//     );
//   });
// };

// const deletePost = (postId) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       "DELETE FROM posts WHERE ?",
//       [{ postid: postId }],
//       (err) => {
//         err ? reject(err) : resolve("Deleted!");
//       }
//     );
//   });
// };

// const editPost = (obj) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       "UPDATE posts SET ? WHERE ?",
//       [
//         {
//           category: obj.category,
//           title: obj.title,
//           details: obj.details,
//           imageURL: obj.imageURL,
//           imptURL: obj.imptURL,
//         },
//         { postid: obj.postId },
//       ],
//       (err) => {
//         err ? reject(err) : resolve("Success");
//       }
//     );
//   });
// };

// module.exports = {
//   // createUser,
//   seeAllPosts,
//   userPost,
//   addPost,
//   deletePost,
//   editPost,
//   userOnePost,
// };
