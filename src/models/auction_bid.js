const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Auction_bid', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        proposed_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        proposed_amount:{ //la cantidad de productos que ofrece el proveedor en la puja
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        target_accumulated: { //el total de todos los productos acumulados de las pujas
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        deleteFlag: {
            // no "delete" porque es palabra reservada.
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
