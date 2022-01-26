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
    static associate(models) {
      // define association here
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