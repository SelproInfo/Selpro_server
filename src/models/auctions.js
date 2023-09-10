const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Auction', {
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
    product_name: { //del producto
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    base_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.INTEGER,// precio si usan el comprar ya
      allowNull: false
    },
    close_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status:{
      type: DataTypes.ENUM("Pendiente", "Activa", "Eliminada", "Terminada"), //pendiente es cuando el admin tiene que aceptar la subasta propuesta
      defaultValue: "Pendiente"
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    authorize: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
    {
      timestamps: true,
      paranoid: true,
      deletedAt: 'destroyTime',
    }
  );
};





