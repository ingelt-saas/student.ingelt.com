import instance from './config/axios';

const authApi = {
    login: (data) => instance.post('/auth', data),
    emailCheck: (email) => instance.post('/auth/email-check', email), // email checking before sign up
    signUp: (data) => instance.post('/auth/signup', data), //sign up
    resetEmail: (data) => instance.post('/auth/resetEmail', data),
    resetTokenVerify: (data) => instance.post('/auth/resetTokenVerify', data),
    updatePassword: (data) => instance.post('/auth/passwordUpdate', data),
};

export default authApi;