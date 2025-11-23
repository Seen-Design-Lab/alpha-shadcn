<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocsController extends Controller
{
    /**
     * Display the documentation page.
     *
     * @return \Illuminate\Contracts\View\View
     */
    public function index()
    {
        // You can pass dynamic data to the view here
        return view('docs.index');
    }

    /**
     * Display a specific documentation section.
     *
     * @param  string  $slug
     * @return \Illuminate\Contracts\View\View
     */
    public function show($slug)
    {
        return view('docs.show', ['slug' => $slug]);
    }
}
