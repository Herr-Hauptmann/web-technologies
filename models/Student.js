'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate({Grupa}) {
      this.belongsTo(Grupa, {foreignKey: "groupId"});
    }
  }
  Student.init({
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    index: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'studenti',
    modelName: 'Student',
  });
  return Student;
};