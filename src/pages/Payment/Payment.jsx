import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    return (
        <div className='px-2 my-10'>
            <Helmet>
                <title>Checkout || PharmaHub</title>
            </Helmet>
            {/* Payment... */}
            <Elements stripe={stripePromise}>
                <Checkout />
            </Elements>
        </div>
    );
};

export default Payment;