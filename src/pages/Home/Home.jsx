import React from 'react';
import CategoryCards from './CategoryCards';
import Banner from './Banner';
import DiscountProducts from './DiscountProducts';
import HealthTips from './HealthTips';
import Testimonials from './Testimonials';
import { Helmet } from 'react-helmet-async';
import FeaturedMedicines from './FeaturedMedicines';
import FAQ from './FAQ';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || PharmaHub</title>
            </Helmet>
            
            <Banner />
            <CategoryCards />
            <FeaturedMedicines />
            <DiscountProducts />
            <HealthTips />
            <Testimonials />
            <WhyChooseUs />
            <FAQ />
        </div>
    );
};

export default Home;