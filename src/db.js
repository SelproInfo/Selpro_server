require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const pg = require('pg')

//postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

//deploy viejo cuenta selpro

//postgres://selpro:72fmgLbfLZ4DVsGeHcTJMQnR2zx6HkNu@dpg-cjnnvavjbvhs73fklocg-a.oregon-postgres.render.com/selpro

//postgres://selpro:72fmgLbfLZ4DVsGeHcTJMQnR2zx6HkNu@dpg-cjnnvavjbvhs73fklocg-a/selpro

// deploy nuevo

//postgres://selpro:KoXxDVLtk5ZFVFdhSK91amA7gOzEqRr5@dpg-cjrv800jbais7391q3v0-a.oregon-postgres.render.com/selpro_n8dc

//postgres://selpro:KoXxDVLtk5ZFVFdhSK91amA7gOzEqRr5@dpg-cjrv800jbais7391q3v0-a/selpro_n8dc


const sequelize = new Sequelize(`postgres://selpro:KoXxDVLtk5ZFVFdhSK91amA7gOzEqRr5@dpg-cjrv800jbais7391q3v0-a/selpro_n8dc`, {
	logging: false,
	native: false,
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
	dialectModule: pg,
});

// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// const sequelize = new Sequelize(
// 	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/selpro`,
// 	{
// 		logging: false,
// 		native: false,
// 	}
// );

const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models'))
	.filter(
		(file) =>
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Category, Product, Sub_category, Auction, Auction_bid, User, Invert_auction, Transaction } = sequelize.models;
// Relaciones n*1

Category.hasMany(Sub_category);
Sub_category.hasMany(Product);

Sub_category.belongsTo(Category);
Product.belongsTo(Sub_category);

Product.hasMany(Auction);
Auction.belongsTo(Product);

Product.hasMany(Invert_auction);
Invert_auction.belongsTo(Product);

Auction.hasMany(Auction_bid);
Auction_bid.belongsTo(Auction);

Invert_auction.hasMany(Auction_bid);
Auction_bid.belongsTo(Invert_auction);

User.hasMany(Auction_bid);
Auction_bid.belongsTo(User);

User.hasMany(Product);
Product.belongsTo(User);

User.hasMany(Auction);
Auction.belongsTo(User);

User.hasMany(Invert_auction);
Invert_auction.belongsTo(User);

User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
