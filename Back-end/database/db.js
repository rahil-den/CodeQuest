import pg from 'pg';
import dotenv from 'dotenv';
const { Client } = pg;
dotenv.config();
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
await client.connect();
export default client;