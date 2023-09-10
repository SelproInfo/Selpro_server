const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('PreUser', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		}
	}, {
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime',
	});
};
