import instance from './config/axios';

const paymentApi = {
    createIntent: (paymentFor) => instance.post(`/payment/createPaymentIntent`, { paymentFor }),
    paymentSuccess: (data) => instance.post(`/payment/paymentSuccess`, data),
};

export default paymentApi;