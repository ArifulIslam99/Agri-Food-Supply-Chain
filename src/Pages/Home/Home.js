import React from 'react';
import AllLogistics from './AllLogistics';
import AllProducts from './AllProducts';
import Banner from './Banner';
import Info from './Info';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Info></Info>
            <AllProducts></AllProducts>
            <AllLogistics></AllLogistics>
        </div>
    );
};

export default Home;