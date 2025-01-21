import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import Checkout from './Checkout';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    return (
        <div>
            {/* Payment... */}
            <Elements stripe={stripePromise}>
                <Checkout />
            </Elements>
        </div>
    );
};

export default Payment;