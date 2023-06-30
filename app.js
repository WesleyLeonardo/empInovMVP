const postgres = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

async function getPgVersion() {
    const result = await sql`select version()`;
    console.log(result);
}

getPgVersion().then(r => console.log(r));
console.log("Hello World!");