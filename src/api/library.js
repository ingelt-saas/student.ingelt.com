import instance from './config/axios';

const libraryApi = {
    getAll: (pageNo, limit) => instance.get(`/library/get-all?pageno=${pageNo}&limit=${limit}`),
    search: (searchQuery, pageNo, limit) => instance.get(`/library/search?s=${searchQuery}&pageno=${pageNo}&limit=${limit}`),
};

export default libraryApi;