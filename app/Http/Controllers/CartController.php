<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Cart;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cart = Cart::join("products", "products.id", "=", "carts.product_id")
                    ->where("carts.user_id", "=", $request->user_id)->get(["carts.*", "products.*", "carts.id as cart_id"])->toArray();
        return response()->json([
            'success' => true,
            'cart' => $cart
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add(Request $request)
    {
        $cart = Cart::where([
            ["user_id", "=", $request->user_id],
            ["product_id", "=", $request->product_id]
        ])->get()->toArray();
        if(count($cart) > 0){
            $data = Cart::where("id", "=", $cart[0]["id"])
                ->update(["product_count" => $cart[0]["product_count"] + 1]);
            if($data){
                return response()->json([
                    'success' => true,
                    'data' => $data,
                    'msg' => "Cart Updated!"
                ], 200);
            }
        }else{
            $data = Cart::create([
                "user_id" => $request->user_id,
                "product_id" => $request->product_id,
                "product_count" => 1
            ]);
            if($data){
                return response()->json([
                    'success' => true,
                    'data' => $data,
                    'msg' => "Added to Cart!"
                ], 200);
            }
        }

        
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
    public function update(Request $request)
    {
        $cart = Cart::find($request->id);
        // dd($cart, $request);
        if($request->mode == "increment"){
            $cart->product_count = $cart->product_count + 1;
            $cart->save();
            return response()->json([
                'success' => true,
                'data' => "Updated!"
            ], 200);
        }else if($request->mode == "decrement"){
            if($cart->product_count == 1){
                $cart->delete();
                return response()->json([
                    'success' => true,
                    'data' => "Deleted!"
                ], 200);

            }else{
                $cart->product_count = $cart->product_count - 1;
                $cart->save();
                return response()->json([
                    'success' => true,
                    'data' => "Updated!"
                ], 200);
            }

        }
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
