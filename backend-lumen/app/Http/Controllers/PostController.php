<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    // GET /posts (public)
    public function index()
    {
        $posts = Post::with('user')->get();
        return response()->json($posts);
    }

    // GET /posts/{id} (public)
    public function show($id)
    {
        $post = Post::with('user')->find($id);
        if (!$post) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($post);
    }

    // POST /posts (protected)
    public function store(Request $request)
    {
        $this->validate($request, [
            'title'   => 'required',
            'content' => 'required'
        ]);

        $post = new Post();
        $post->user_id = Auth::id();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->save();

        return response()->json($post, 201);
    }

    // PUT /posts/{id} (protected)
    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $this->validate($request, [
            'title'   => 'required',
            'content' => 'required'
        ]);

        $post->update($request->only('title','content'));
        return response()->json($post);
    }

    // DELETE /posts/{id} (protected)
    public function destroy($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $post->delete();
        return response()->json(['message' => 'Post deleted']);
    }
}
