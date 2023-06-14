import instance from './config/axios';

const modulesApi = {
    getAll: (subject, pageNo, limit, searchQuery) => instance.get(`/modules/getall?pageNo=${pageNo}&limit=${limit}&subject=${subject}${searchQuery ? `&s=${searchQuery}` : ''}`),
    countViews: (moduleId) => instance.put(`/modules/countViews/${moduleId}`),
};

export default modulesApi;