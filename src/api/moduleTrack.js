import instance from './config/axios';

const moduleTrackApi = {
    create: (data) => instance.post('/moduleTracking', data),
    get: (moduleId) => instance.get(`/moduleTracking/get/${moduleId}`),
    update: (id, data) => instance.put(`/moduleTracking/${id}`, data),
};

export default moduleTrackApi;