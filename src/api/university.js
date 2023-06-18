import instance from './config/axios';

const universityApi = {
    getAll: (pageNo, limit) => instance.get(`/university/getall?pageNo=${pageNo}&limit=${limit}`),
    shortlistedUniversities: () => instance.get(`/university/shortlist`),
    addUniversityInShortlist: (universityId) => instance.post(`/university/shortlist/${universityId}`),
    removeUniversityFromShortlist: (universityId) => instance.delete(`/university/shortlist/${universityId}`),
    sendQuery: () => instance.post(`/university/sendQuery`),
};

export default universityApi;