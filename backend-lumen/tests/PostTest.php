<?php

use App\Models\User;
use App\Models\Post;
use Laravel\Lumen\Testing\DatabaseMigrations;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PostTest extends TestCase
{
    use DatabaseMigrations;

    private $token;

    public function setUp(): void
    {
        parent::setUp();

        // Create a test user 
        $user = new User([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('secret123'),
        ]);
        $user->save();

        // Generate JWT token
        $this->token = JWTAuth::fromUser($user);
    }

    public function testGetPostsPublic()
    {
        $this->get('/posts')
             ->seeStatusCode(200);
    }

    public function testCreatePostRequiresAuth()
    {
        $this->post('/posts', ['title' => 'Nope', 'content' => 'Nope'])
            ->seeStatusCode(401);
    }

    public function testCreatePostWithAuth()
    {
        $payload = [
            'title' => 'New Post',
            'content' => 'Hello World'
        ];

        // Pass the JWT in the Authorization header
        $this->post('/posts', $payload, [
            'Authorization' => 'Bearer ' . $this->token
        ])
        ->seeStatusCode(201)
        ->seeJson(['title' => 'New Post']);
    }
}
