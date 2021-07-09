<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use Auth;
class UserLoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function login(Request $request){
        $data = [];
        $userCredentals = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if(!Auth::attempt($userCredentals)){
            $data['user'] = 'Invalid Username or Password';
            return response()->json([
                'success' => false,
                'data' => 'Invalid Username or Password'
            ], 401);
        }
        $data['user'] = auth()->user();

        $data['accessToken'] = auth()->user()->createToken('token')->accessToken;

        return response()->json([
            'success' => true,
            'data' => $data
        ], 200);

    }


    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
