import { Request, Response } from 'express';
import redisClient from '../config/redisClient';
import Post from '../models/Post';
import User from '../models/User';

const CACHE_KEY = 'all_posts';

// GET /posts - Fetch posts with user data
export const getPosts = async (req: Request, res: Response) => {
  try {
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      console.log('Returning cached posts');
      return res.json(JSON.parse(cachedData));
    }

    console.log('Fetching posts with users from MySQL...');
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    await redisClient.set(CACHE_KEY, JSON.stringify(posts), { EX: 60 });

    return res.json(posts);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

