const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags: {
      type: DataTypes.STRING,  // en el json flag son urls
      validate: {
        isUrl: true,
      },
      allowNull: true,
    },
    continents: {
      type: DataTypes.STRING,  
      allowNull: true,
    },
    capital: {
      type: DataTypes.STRING,  
      allowNull: true,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
  population:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // createdInDb: { // por si necesito acceder al paias de mi BD
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // }
  });
};