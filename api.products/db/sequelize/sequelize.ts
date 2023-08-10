import { Sequelize } from 'sequelize';

const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PORT = process.env.MYSQL_PORT;


export const sequelize = new Sequelize('marz', MYSQL_USER as string, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    dialect: 'mariadb',
    define: {
        freezeTableName: true,
    },
});