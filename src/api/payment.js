import instance from './config/axios';

const paymentApi = {
    createIntent: (paymentFor) => instance.post(`/payment/createPaymentIntent`, { paymentFor }),
};

export default paymentApi;