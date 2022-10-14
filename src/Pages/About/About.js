import React from 'react';
import logo from "../../images/logo.png"

const About = () => {
    return (
        <div>
            <div className="card lg:card-side bg-base-200 shadow-xl my-14">
                <figure><img src={logo} alt="Album" /></figure>
                <div className="card-body text-white bg-gradient-to-r from-yellow-600 to-red-800 ">
                    <h2 className="card-title font-bold text-2xl">FoodChain Bangladesh Limited!</h2>
                    <p className='text-justify'>
                        Food waste is a massive global problem. In fact, if food waste were a country, it would be the third-largest emitter of greenhouse gases, right after the USA and China (FAO). This food loss and waste happens at all stages of the food system. We often hear about food going to waste in our homes or being lost at the farmer’s level. But little is spoken about the food that is lost at the trader and buyer level.
                        Much of the food we eat is grown, harvested, and then transported to warehouses where it is sorted, packed, and stored until it can be sold and transported to the final destination.  Traders buy produce in bulk from all over the world, and then they sell this produce to supermarkets, retailers, and wholesalers. If there are disruptions in this system or if food cannot be sold fast enough, it goes off and is thrown out. This has negative consequences for all of us: the farmers who grew that food don’t get paid, the traders lose profit, and all of the resources that went into growing the food – including the precious water and energy resources – are wasted too. What if we could ensure all food is sold at the right time, at the right place, and to the right people?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;