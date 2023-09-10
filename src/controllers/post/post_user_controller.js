const { User } = require('../../db.js');
const bcrypt = require('bcrypt');
const { get_usersByName } = require('../get/get_user_by_user_name_controller.js');
const { sendEmail } = require('./email_service.js');

const postUser = async (newUser) => {
	const {
		name,
		num_ident,
		user_name,
		phone,
		email,
		adress,
		company_name,
		NIT,
		sector,
		CIIU,
		id_subcat,
	} = newUser;


	if(!name, !num_ident, !user_name, !company_name, !NIT, !sector, !CIIU, !phone, !email, !id_subcat, !adress) {
		throw new Error ('Falta data.');
	};
	let user_id = Math.floor(100000 + Math.random() * 900000);

	const user_id_exists = async (user_id)=> {
		user_id = Math.floor(100000 + Math.random() * 900000);
		let exists = await User.findByPk(user_id)
		if (exists){
			user_id = Math.floor(100000 + Math.random() * 900000);
			return user_id_exists(user_id)
		}
	}

	const user = await User.create({
		user_id,
		name,
		num_ident,
		user_name,
		phone,
		email,
		adress,
		company_name,
		NIT,
		sector,
		CIIU,
		id_subcat,
		image: 'https://res.cloudinary.com/dig5mhr7d/image/upload/v1692815971/selpro/user-documents/guest_kcab3k.png',
		RUT_image: null,
		commerce_chamber: null,
		legal_ident: null,
		commercial_references: null,
		interaction_history: [],
		offers_history: [],
		win_history: [],
		curr_auc: [],
		favorites: [],
		supplier: false,
		deleteFlag: false,
	});

	const usuario = await get_usersByName(num_ident)
	const userId = usuario.id
	await sendEmail(userId)
	return user;
};

module.exports = {
	postUser
};