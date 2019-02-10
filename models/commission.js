module.exports = function(sequelize, DataTypes) {
  var CommissionRequest = sequelize.define("CommissionRequest", {
    name: {
      type: DataTypes.STRING,
      notNull: true
    },
    requestDetails: DataTypes.TEXT,
    referenceImgURL: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    medium: {
      type: DataTypes.STRING,
      defaultValue: "Digital"
    },
    artist: {
      type: DataTypes.STRING,
      defaultValue: "CJ Frei"
    }
  });
  return CommissionRequest;
};
