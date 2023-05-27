import instance from "./config/axios";

const notesApi = {
  getNotes: (pageNo, limit, searchQuery) => instance.get(`/notes/getall?pageNo=${pageNo}&limit=${limit}${searchQuery ? `&s=${searchQuery}` : ''}`),
  search: (searchQuery, pageNo, limit) => instance.get(`/notes/search?s=${searchQuery}&pageno=${pageNo}&limit=${limit}`),
};

export default notesApi;
