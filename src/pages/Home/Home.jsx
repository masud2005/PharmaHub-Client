import React from 'react';
import CategoryCards from './CategoryCards';
import Banner from './Banner';
import DiscountProducts from './DiscountProducts';

const Home = () => {
    return (
        <div>
            <Banner />
            <CategoryCards />
            <DiscountProducts />
        </div>
    );
};

export default Home;