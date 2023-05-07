import instance from "./config/axios";

const notesApi = {
  getNotes: (pageNo, limit) => instance.get(`/notes/all?pageno=${pageNo}&limit=${limit}`),
  search: (searchQuery, pageNo, limit) => instance.get(`/notes/search?s=${searchQuery}&pageno=${pageNo}&limit=${limit}`),
};

export default notesApi;
