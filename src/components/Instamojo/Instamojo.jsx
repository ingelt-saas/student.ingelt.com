import { Button } from '@mui/material';
import React, { useEffect } from 'react';

const InstamojoPayment = ({ buttonClass, children, successHandler, data: { amount, purpose } }) => {

    const openInstamojo = () => {
        window.Instamojo.open('https://www.instamojo.com/@ingeltboard')
    }

    useEffect(() => {

        // init instamojo script
        const script = document.createElement("script");
        script.src = "https://js.instamojo.com/v1/checkout.js";
        script.async = true;
        document.head.appendChild(script);

        window.Instamojo.configure({
            onClose: () => {
                window.Instamojo.close();
            }
        });

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
            onClick={openInstamojo}
        >{children}</Button>
    );
}

export default InstamojoPayment;
