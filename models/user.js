const bcryptjs = require("bcryptjs");

//User
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  //Custom Method --used in line 20 of passport.js
  User.prototype.validPassword = function (password) {
    return bcrytpjs.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", (user) => {
    user.password = bcryptjs.hashSync(
      user.password,
      bcryptjs.genSaltSync(10),
      null
    );
  });

  return User;
};
