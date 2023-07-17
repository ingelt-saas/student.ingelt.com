import instance from './config/axios';

const sessionApi = {
    create: (data) => instance.post(`/session`, data),
    getSessions: () => instance.get(`/session`),
};

export default sessionApi;