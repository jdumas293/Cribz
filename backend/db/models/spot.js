'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { as: "Owner", foreignKey: 'ownerId' });
      Spot.hasMany(models.Review, { foreignKey: 'spotId' });
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: "Address must be less than 100 characters.",
          arg: [1, 100]
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
