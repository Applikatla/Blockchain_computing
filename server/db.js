import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: 'postgres',
    password: '4545',
    host: 'localhost',
    port: 5432,
    database: 'blockchain_computing'
});

