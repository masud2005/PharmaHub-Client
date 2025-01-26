import React from 'react';
import CategoryCards from './CategoryCards';
import Banner from './Banner';
import DiscountProducts from './DiscountProducts';
import HealthTips from './HealthTips';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Banner />
            <CategoryCards />
            <DiscountProducts />
            <HealthTips />
            <Testimonials />
        </div>
    );
};

export default Home;