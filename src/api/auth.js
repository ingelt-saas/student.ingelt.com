import instance from './config/axios';

const authApi = {
    login: (data) => instance.post('/auth', data),
};

export default authApi;