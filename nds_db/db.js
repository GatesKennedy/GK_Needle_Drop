const { Pool } = require('pg');
const config = require('config');
const { user, host, database, password, port } = config.get('db_config');

const pool = new Pool({ user, host, database, password, port });

if(pool) console.log(`GOOD: PostgresDB Connected...`);

module.exports = pool;