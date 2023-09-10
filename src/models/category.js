const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Category', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deleteFlag: {
            // no "delete" porque es palabra reservada.
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
        {
            timestamps: true,
            paranoid: true,
            deletedAt: 'destroyTime',
        }
    );
};
