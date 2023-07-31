import React, { useContext, useEffect, useState } from 'react';
import paymentApi from '../../api/payment';
import { Button } from '@mui/material';
import logo from '../../assets/images/navlogo.png';
import { StudentContext } from '../../contexts';

const RazorPay = ({ children, paymentFor, description, successHandler, buttonClass }) => {

    // states
    const [loading, setLoading] = useState(false);

    // context
    const { student } = useContext(StudentContext);

    const openRazorpayModal = (order_id) => {

        if (!order_id) {
            return;
        }
        // const paymentId = response.razorpay_payment_id;

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            name: "InGelt Board",
            description: description || '',
            order_id: order_id,
            image: logo,
            prefill: {
                name: student?.name,
                contact: student?.phoneNo,
                email: student?.email,
            },
            handler: successHandler,
            theme: {
                color: "#0C3C82",
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }

    const createOrder = async () => {
        setLoading(true);
        try {
            const res = await paymentApi.createIntent(paymentFor);
            setLoading(false);
            if (res.data?.id) {
                openRazorpayModal(res.data?.id);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {

        // init razor pay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

    }, []);

    return (
        <Button
            variant='contained'
            className={buttonClass}
            sx={{
                backgroundColor: '#0C3C82',
                '&:hover': {
                    backgroundColor: '#0C3C82'
                }
            }}
            disabled={loading}
            onClick={createOrder}
        >{children}</Button>
    );
}

export default RazorPay;
