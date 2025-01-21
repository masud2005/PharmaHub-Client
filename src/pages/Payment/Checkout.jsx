import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useCart from '../../hooks/useCart';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState();
    const [clientSecret, setClientSecret] = useState('');
    const [cart, refetch] = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.pricePerUnit, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log(error.message);
            // setError(error.message);
            toast.error(error.message);
        } else {
            console.log('Payment Method', paymentMethod);
            // setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('Confirm error', confirmError);
        } else {
            console.log('Payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                const paymentInfo = {
                    email: user.email,
                    name: user.displayName,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    cartIds: cart.map(item => item._id),
                    status: 'Pending'
                };

                const res = await axiosSecure.post('/payments', paymentInfo)
                    .then(res => {
                        if (res.data.paymentResult.insertedId) {
                            toast.success('Congratulations! You have successfully completed the payment.');
                            refetch();
                            navigate('/invoice', { state: { paymentInfo } })
                        }
                    });
            }
        }
    };

    return (
        <div className="bg-gray-50 max-w-[600px] mx-auto p-4 md:p-8 rounded-lg shadow-lg">
            <h1 className="text-center text-2xl font-semibold mb-6 text-teal-600">Checkout</h1>
            <h2 className="text-center text-xl mb-6">Total Price: <span className="text-teal-600 font-bold">₹{totalPrice}</span></h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-4 border rounded-lg shadow-sm bg-white"
                />
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <div className="text-center mt-6">
                    <button
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-teal-700 transition duration-300"
                        type="submit"
                    >
                        Purchase
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
