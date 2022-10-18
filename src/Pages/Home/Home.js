import React from 'react';
import AllProducts from './AllProducts';
import Banner from './Banner';
import Info from './Info';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Info></Info>
            <AllProducts></AllProducts>
        </div>
    );
};

export default Home;