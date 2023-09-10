const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3001',
    clientID: 'o8VAgWVcosgeAV7QE1G2MjhiCJfo32Ko',
    issuerBaseURL: 'https://dev-v6baogpv0kutvt0g.us.auth0.com'
};

module.exports = {
    config,
};