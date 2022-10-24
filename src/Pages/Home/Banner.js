import React from 'react';
import fruits from "../../images/fruits_home.jpeg"

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col w-full lg:flex-row-reverse">
                    <img alt='Fruits Image min-w-0 ' src={fruits} className="max-w-lg rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Grab Your Fresh Food!</h1>
                        <p className="py-6">Fitness starts at home. What you eat is what you will look, just as what you sow is what you reap. Eat good food: eat fruits, vegetables, healthy grains, and don't go for sweet and trite food.
                        </p>
                        <button className="btn font-bold btn-primary bg-gradient-to-r from-primary to-secondary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;