const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    URL  : process.env.MONGO_URL,
    ZIP : process.env.ZIP_URL,
}