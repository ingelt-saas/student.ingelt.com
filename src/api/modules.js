import instance from './config/axios';

const modulesApi = {
    getAll: (moduleType, pageNo, limit, searchQuery) => instance.get(`/modules/getall?pageNo=${pageNo}&limit=${limit}&type=${moduleType}${searchQuery ? `&s=${searchQuery}` : ''}`),
    countViews: (moduleId) => instance.put(`/modules/countViews/${moduleId}`),
};

export default modulesApi;