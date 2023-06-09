import instance from './config/axios';

const modulesApi = {
    getAll: (subject, pageNo, limit, searchQuery) => instance.get(`modules/getall?pageNo=${pageNo}&limit=${limit}&subject=${subject}${searchQuery ? `&s=${searchQuery}` : ''}`),
};

export default modulesApi;