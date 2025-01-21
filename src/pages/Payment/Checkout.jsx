import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useCart from '../../hooks/useCart';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Checkout = () => {
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState();
    const [clientSecret, setClientSecret] = useState('');
    const [cart, refetch] = useCart();
    const { user } = useAuth();

    const totalPrice = cart.reduce((total, item) => total + item.pricePerUnit, 0);
    // console.log(totalPrice);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])


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
        })
        if (error) {
            console.log('Error', error);
            setError(error.message);
        }
        else {
            console.log('Payment Method', paymentMethod);
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('Confirm error', confirmError);
        }
        else {
            console.log("Payment Intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {

                // Now save the payment info in the database
                const paymentInfo = {
                    email: user.email,
                    name: user.displayName,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    cartIds: cart.map(item => item._id),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', paymentInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.paymentResult.insertedId) {
                            toast.success('Congratulations! You have successfully payment.');
                        }
                        refetch();
                    })
            }
        }
    }

    return (
        <div className="bg-white max-w-[992px] mx-auto p-10">
            <h1 className='text-center text-xl'>Total Price <span className='text-teal-600 '>₹{totalPrice}</span></h1>
            <form onSubmit={handleSubmit}>
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
                />
                <p className='text-red-500 mt-5'>{error}</p>
                <div className="mx-auto w-full text-center mt-10">
                    <button className="btn px-20 bg-orange-500 text-white font-bold text-lg hover:text-black" type="submit" >
                        Purchase
                    </button>
                </div>
            </form>
            {/* <div className="mt-10">
                <p className="text-red-500">{error}</p>
                {transactionId && <p className="font-semibold"><span className="text-green-600">Your transaction ID:</span> {transactionId}</p>}
            </div> */}
        </div>

    );
};

export default Checkout;