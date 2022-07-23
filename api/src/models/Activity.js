const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    difficulty: {
        type: DataTypes.ENUM({
            values: ['1','2','3','4','5']
        }),
        allowNull: true,
    },
    duration:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    season: {
        type: DataTypes.ENUM({
            values: ['summer', 'fall', 'spring', 'winter']
        }),
        allowNull: true,
    },
    });
};