import instance from './config/axios';

const libraryApi = {
    getAll: (pageNo, limit, searchQuery) => instance.get(`/library/get-all?pageNo=${pageNo}&limit=${limit}${searchQuery ? `&s=${searchQuery}` : ''}`),
    search: (searchQuery, pageNo, limit) => instance.get(`/library/search?s=${searchQuery}&pageno=${pageNo}&limit=${limit}`),
};

export default libraryApi;