// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/postRoutes';
import sequelize from './config/db';

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 4000;

// Connect to MySQL and start server
sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Database connection failed:', err);
});

export default app;
