const app = require("./app");
const connectDB = require("./config/db");
const { serverPort } = require("./secret");

app.listen(serverPort, async () => {
    console.log(`Server running on the  port http://localhost:${serverPort}`);
    await connectDB();
});
