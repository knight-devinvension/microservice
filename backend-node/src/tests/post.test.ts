import request from 'supertest';
import app from '../server';
import sequelize from '../config/db';
import User from '../models/User';
import Post from '../models/Post';

describe('📝 Posts API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    const user = await User.create({ id: 1, name: 'John Doe', email: 'john@example.com' });

    await Post.create({
      user_id: user.id,
      title: 'Test Post',
      content: 'Hello World!',
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  test('GET /posts should return at least one post', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /posts should return posts with user details', async () => {
    const res = await request(app).get('/posts');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('user');
    expect(res.body[0].user.name).toBe('John Doe');
  });
});
