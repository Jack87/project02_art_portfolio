module.exports = function(sequelize, DataTypes) {
  var Artwork = sequelize.define(
    "Artwork",
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      dateCreated: DataTypes.DATEONLY,
      imgURL: DataTypes.STRING,
      category: DataTypes.STRING,
      price: {
        type: DataTypes.FLOAT,
        length: 20,
        decimals: 2
      },
      size: DataTypes.STRING,
      medium: DataTypes.STRING,
      artist: DataTypes.STRING,
      onCarousel: {
        type: DataTypes.BOOLEAN,
        default: 0
      }
    },
    {
      freezeTableName: true
    }
  );
  return Artwork;
};
