import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const StripeElements = ({ paymentFor, successHandler, loading }) => {

    return (
        <Elements stripe={stripePromise} >
            <CheckoutForm paymentFor={paymentFor} successHandler={successHandler} loading={loading} />
        </Elements>
    );
}

export default StripeElements;
