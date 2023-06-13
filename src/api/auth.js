import instance from './config/axios';

const authApi = {
    login: (data) => instance.post('/auth', data),
    signUp: (data) => instance.post('/auth/student/signup', data), //sign up
    resetEmail: (data) => instance.post('/auth/resetEmail', data),
    resetTokenVerify: (data) => instance.post('/auth/resetTokenVerify', data),
    updatePassword: (data) => instance.post('/auth/passwordUpdate', data),
};

export default authApi;