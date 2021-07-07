<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Arr;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $productSuffixes = ['Shoes', "T-Shirt", "Jeans", "Jacket", "Hat"];
        $name = $this->faker->company . ' ' . Arr::random($productSuffixes);

        return [
            'product_name' => $name,
            'product_description' => $this->faker->realText(255),
            'on_sale' => Arr::random([true, false]),
            'product_price' => $this->faker->numberBetween(1000, 2000),
            'product_price_discounted' => $this->faker->numberBetween(500, 1000)
        ];
    }
}
