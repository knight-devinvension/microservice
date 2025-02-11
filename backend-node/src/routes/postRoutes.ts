// src/routes/postRoutes.ts
import { Router } from 'express';
import { getPosts } from '../controllers/postController';

const router = Router();

router.get('/posts', getPosts);

export default router;
