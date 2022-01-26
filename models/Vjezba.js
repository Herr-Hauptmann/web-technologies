const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vjezba extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Zadatak}) {
      this.hasMany(Zadatak, {foreignKey:"vjezbaId"});
    }
  }
  Vjezba.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'vjezbe',
    modelName: 'Vjezba',
  });
  return Vjezba;
};