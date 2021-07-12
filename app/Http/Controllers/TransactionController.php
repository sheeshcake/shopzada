<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cartalyst\Stripe\Stripe;
use App\Models\Cart;
use App\Models\Transaction;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    public function purchase(Request $request){
        $carts = $request->cart_id;
        $user_id = $request->user_id;
        $total = 0;
        foreach($carts as $index => $cart){
            if($cart["is_checked"] == true){
                $product_details = Cart::join("products", "products.id", "=", "carts.product_id")
                                    ->where("carts.id", "=", $cart["cart_id"])->get()->toArray();
                $total += $product_details[0]["product_price"] * $product_details[0]["product_count"];
            }
        }
        return response()->json([
            'success' => true,
            'total' => $total
        ], 200);
    }



    public function pay(Request $request){
        // dd($request);
        $carts = $request->carts;
        $data = $request->data;
        $stripe = Stripe::make(config('app.stripe'));
        $charge = $stripe->charges()->create([
            'amount' => $data["amount"],
            'currency' =>  $data["currency"],
            'source' => $data["stripeToken"],
            'description' => $data["description"],
            'receipt_email' => $data["email"],
            'metadata' => [
                'address' => $data["address"],
                'address_country' => $data["address_country"],
                
            ]
        ]);
        foreach($carts as $cart){
            if($cart["is_checked"]){
                $transaction = Transaction::
                where("cart_id", "=", $cart["cart_id"])
                ->update([
                    "status" => "paid"
                ]);
            }
        }
        return response()->json([
            'success' => true,
             'data' => $charge,
        ], 200);
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
