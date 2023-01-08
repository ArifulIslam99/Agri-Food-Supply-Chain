import React from 'react';
import AllLogistics from './AllLogistics';
import AllProducts from './AllProducts';
import Banner from './Banner';
import Info from './Info';
import Footer from "./../Shared/Footer"

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Info></Info>
            <AllProducts></AllProducts>
            <AllLogistics></AllLogistics>
            <Footer></Footer>
        </div>
    );
};

export default Home;