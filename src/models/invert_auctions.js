const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Invert_auction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    image: { //del producto
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: { //del producto
      type: DataTypes.STRING,
      allowNull: false
    },
    description: { //del producto
      type: DataTypes.STRING,
      allowNull: false
    },
    datasheet: { //del producto
      type: DataTypes.STRING,
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    target_quantity: { //el total de productos que desea conseguir el cliente
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    desired_price: { //precio deseado por el comprador 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    close_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: { //esta tiene solo activa porque la crea el admin y automáticamente se pone como activa
      type: DataTypes.ENUM("Activa", "Eliminada", "Terminada"), //pendiente es cuando el admin tiene que aceptar la subasta propuesta
      defaultValue: "Activa"
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    authorize: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    invert: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
    {
      timestamps: true,
      paranoid: true,
      deletedAt: 'destroyTime',
    }
  );
};