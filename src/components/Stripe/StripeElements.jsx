import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import paymentApi from '../../api/payment';
import { CircularProgress } from '@mui/material';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const StripeElements = ({ paymentFor, successHandler, loading }) => {

    // states 
    const [clientSecret, setClientSecret] = useState(null);

    // create payment intent
    useEffect(() => {
        (async () => {
            try {
                const result = await paymentApi.createIntent(paymentFor === 'session' ? 'session' : 'online');
                setClientSecret(result.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [paymentFor]);

    if (!clientSecret) {
        return <div className='flex py-5 justify-center'>
            <CircularProgress sx={{ '& circle': { stroke: '#0C3C82' } }} />
        </div>
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret: clientSecret,
                appearance: {
                    theme: 'stripe'
                },
                // payment_method_types: ['card', 'paypal', 'upi']
                // paymentMethodTypes: ['card', 'paypal', 'upi'],
                // mode: 'setup',
                // amount: 300,
                // currency: 'inr'
            }}
        >
            <CheckoutForm paymentFor={paymentFor} successHandler={successHandler} loading={loading} />
        </Elements>
    );
}

export default StripeElements;
