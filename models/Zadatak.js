'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zadatak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Vjezba}) {
      this.belongsTo(Vjezba, {foreignKey: "vjezbaId"});
    }
  }
  Zadatak.init({
    naziv: DataTypes.STRING,
    vjezbaId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'zadaci',
    modelName: 'Zadatak',
  });
  return Zadatak;
};