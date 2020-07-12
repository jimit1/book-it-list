connection = require("./connection");

// Object Reference Module

connection.connect((err) => {
  if (err) throw err;
});

const seeAllPosts = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM posts", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

const showPost = (userIdInput) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM posts WHERE ?",
      [{ userId: userIdInput }],
      (err, data) => {
        err ? reject(err) : resolve(data);
      }
    );
  });
};

const addPost = (obj) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO posts SET ?",
      [
        {
          userId: obj.userId,
          category: obj.category,
          title: obj.title,
          details: obj.details,
          imageURL: obj.imageURL,
          imptURL: obj.imptURL,
        },
      ],
      (err) => {
        err ? reject(err) : resolve("Success");
      }
    );
  });
};

const deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM posts WHERE ?", [{ id: postId }], (err) => {
      err ? reject(err) : resolve("Deleted!");
    });
  });
};

const editPost = (obj) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE posts SET ? WHERE ?",
      [
        {
          userId: obj.userId,
          category: obj.category,
          title: obj.title,
          details: obj.details,
          imageURL: obj.imageURL,
          imptURL: obj.imptURL,
        },
        { id: obj.postId },
      ],
      (err) => {
        err ? reject(err) : resolve("Success");
      }
    );
  });
};

module.exports = { seeAllPosts, showPost, addPost, deletePost, editPost };
