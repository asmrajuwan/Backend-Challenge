require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 3001;
const mongoDbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/backendChallenge";

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY ||'ASDASDASSFEFDFDFGF';
const jwtAccessKey = process.env.JWT_ACCESS_KEY ||'ASDASDASSFEFDFDFGF';
const jwtRefreshKey = process.env.JWT_REFRESH_KEY ||'ASDASDASSFEFDFDFGF';

const jwtResetPasswordKey = process.env.JWT_RESET_PASSWORD_KEY ||'ASDASDASSFEFDFDFGF';

module.exports = {serverPort,mongoDbUrl,jwtAccessKey,jwtActivationKey,jwtRefreshKey,jwtResetPasswordKey};