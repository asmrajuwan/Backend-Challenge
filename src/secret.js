require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3001;
const mongoDbUrl =
    process.env.MONGODB_URL || "mongodb://localhost:27017/backendChallenge";

const jwtAccessKey = process.env.JWT_ACCESS_KEY || "ASDASDASSFEFDFDFGF";

module.exports = {
    serverPort,
    mongoDbUrl,
    jwtAccessKey,
};
