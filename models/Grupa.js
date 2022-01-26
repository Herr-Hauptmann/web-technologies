'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grupa extends Model {
    static associate({Student}) {
      this.hasMany(Student, {foreignKey:"groupId"});
    }
  }
  Grupa.init({
    naziv: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    }
  },{
    sequelize,
    tableName: 'grupe',
    modelName: 'Grupa',
  });
  return Grupa;
};