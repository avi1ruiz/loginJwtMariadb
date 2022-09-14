import mysql from 'mysql2/promise'

const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'database_users'
})

console.log('Connection with mysql successful');

export default pool;