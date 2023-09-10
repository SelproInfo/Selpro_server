const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		},
		num_ident: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		user_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		adress: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
			unique: true,
		},
		company_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		NIT: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
		},
		sector: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		CIIU: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		id_subcat: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			defaultValue: 'https://res.cloudinary.com/dig5mhr7d/image/upload/v1692815971/selpro/user-documents/guest_kcab3k.png',
		},
		RUT_image: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		commerce_chamber: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		legal_ident: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		commercial_references: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		interaction_history: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: true,
			defaultValue: []
		},
		created_history: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: true,
			defaultValue: []
		},
		favorites: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: true,
			defaultValue: []
		},
		supplier: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		deleteFlag: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},

	}, {
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime',
	});
};
