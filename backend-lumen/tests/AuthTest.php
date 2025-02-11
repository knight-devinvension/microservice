<?php

use App\Models\User;
use Laravel\Lumen\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use DatabaseMigrations;

    public function testUserCanRegister()
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'secret123'
        ];

        $this->post('/register', $payload)
             ->seeStatusCode(201)
             ->seeJson(['message' => 'User registered successfully']);
    }

    public function testUserCanLogin()
    {
        // Create user manually (in Lumen) 
        $user = new User([
            'name' => 'Login User',
            'email' => 'login@example.com',
            'password' => Hash::make('secret123')
        ]);
        $user->save();

        $this->post('/login', [
            'email' => 'login@example.com',
            'password' => 'secret123'
        ])
        ->seeStatusCode(200)
        ->seeJsonStructure(['token']);
    }
}
