const { PreUser } = require('../../db');

const postPreUser = async (newPreUser) => {
	const {email} = newPreUser;

	if(!email) {
		throw new Error ('Falta data.');
	};

	const user = await PreUser.create({email});
	return user;
};

module.exports = {
	postPreUser
};