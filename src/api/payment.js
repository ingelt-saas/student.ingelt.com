import instance from './config/axios';

const paymentApi = {
    createIntent: (data) => instance.post(`/payment/createPaymentIntent`, data),
    paymentSuccess: (data) => instance.post(`/payment/paymentSuccess`, data),
    verifyModuleCoupon: (data) => instance.post(`/payment/moduleCouponValidation`, data),
};

export default paymentApi;