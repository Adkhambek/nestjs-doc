import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  database: {
    client: 'pg',
    connection: process.env.DB_URL,
  },
};

export default config;
