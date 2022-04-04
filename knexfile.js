require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
  },
};
