import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;

const sequelize =
  NODE_ENV === 'test'
    ? new Sequelize('sqlite::memory:', { logging: false })
    : new Sequelize(MYSQL_DATABASE || '', MYSQL_USER || 'root', MYSQL_PASSWORD || '', {
        host: MYSQL_HOST || 'localhost',
        port: Number(MYSQL_PORT) || 3306,
        dialect: 'mysql',
        logging: false,
      });

export default sequelize;
