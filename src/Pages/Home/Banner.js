import React from 'react';
import tomato from "../../images/tomato.webp"
import fruits from "../../images/fruits_home.jpeg"

const Banner = () => {
    return (
        <div>
            <div class="hero min-h-screen">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <img src={tomato} class="max-w-lg rounded-lg shadow-2xl" />
                    <div>
                        <h1 class="text-5xl font-bold">Grab Your Fresh Food!</h1>
                        <p class="py-6">Fitness starts at home. What you eat is what you will look, just as what you sow is what you reap. Eat good food: eat fruits, vegetables, healthy grains, and don't go for sweet and trite food.
                        </p>
                        <button class="btn font-bold btn-primary bg-gradient-to-r from-primary to-secondary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;