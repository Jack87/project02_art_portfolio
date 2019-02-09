module.exports = function(sequelize, DataTypes) {
  var CommissionRequest = sequelize.define("CommissionRequest", {
    name: DataTypes.STRING,
    requestDetails: DataTypes.TEXT,
    referenceImgURL: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    medium: DataTypes.STRING,
    artist: DataTypes.STRING
  });
  return CommissionRequest;
};
