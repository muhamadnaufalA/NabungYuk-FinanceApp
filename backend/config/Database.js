import { Sequelize } from "sequelize";

const db = new Sequelize('financial_report', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres', // Menggunakan PostgreSQLA
    port: 5432, // Port default PostgreSQL
})

export default db;
