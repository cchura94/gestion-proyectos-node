'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Usuario.belongsToMany(models.Actividad, { 
        through: "ActividadUsuario",
        foreignKey: 'usuarioId' 
      });

      models.Usuario.belongsToMany(models.Role, { 
        through: "RoleUsuario" 
      });
    }
  };
  Usuario.init({
    correo: DataTypes.STRING,
    clave: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};