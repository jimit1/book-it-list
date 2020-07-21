module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define("Settings", {
    view: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    font: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mode: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    profileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Settings.associate = (models) => {
    Settings.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Settings;
};
// view, font, mode, profileUrl, userId
