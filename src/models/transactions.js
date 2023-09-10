const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Transaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        date_approved: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment_type_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transaction_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        payment_method_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        card_last_four_digits: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        payer_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: false });
};
