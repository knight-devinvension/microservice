<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->group([], function () use ($router) {
    // Auth
    $router->post('/register', 'AuthController@register');
    $router->post('/login', 'AuthController@login');
    $router->get('/posts', 'PostController@index');
    $router->get('/posts/{id}', 'PostController@show');
});

// Protected routes
$router->group(['middleware' => 'auth:api'], function () use ($router) {
    $router->get('/me', 'AuthController@me');
    $router->post('/posts', 'PostController@store');
    $router->put('/posts/{id}', 'PostController@update');
    $router->delete('/posts/{id}', 'PostController@destroy');
});
