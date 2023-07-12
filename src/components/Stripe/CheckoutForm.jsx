import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { StudentContext } from '../../contexts';
import paymentApi from '../../api/payment';

const CheckoutForm = () => {

    // states 
    const [loading, setLoading] = useState(false);
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    // context 
    const { student } = useContext(StudentContext);

    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {

        setCardError('');
        setLoading(true);
        e.preventDefault();

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setLoading(false);
            return;
        }

        const { error } = await stripe.createPaymentMethod({ type: 'card', card });

        if (error) {
            setCardError(error.message);
            setLoading(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: student?.name,
                        email: student?.email,
                        phone: student?.phoneNo,
                        address: `${student?.city}- ${student?.state}-${student?.country}`,
                    },
                },
            },
        );

        if (confirmError) {
            setLoading(false);
            setCardError(confirmError.message);
        }

        console.log(paymentIntent, 'error', confirmError);

        // if (paymentIntent.status === "succeeded") {
        //     const paymentData = {
        //         paymentMethod: paymentIntent?.payment_method_types,
        //         transitionID: paymentIntent?.id,
        //         payment: true,
        //         paymentDate: ``,
        //     }


        // }

    }

    useEffect(() => {
        (async () => {
            try {
                const result = await paymentApi.createIntent('online');
                setClientSecret(result.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <form onSubmit={paymentHandler}>
            <CardElement />
            {cardError && <p className='text-center text-red-500 py-2 text-sm font-medium'>{cardError}</p>}
            <button disabled={!stripe} >Submit</button>
        </form>
    );
};

export default CheckoutForm;