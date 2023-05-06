import instance from "./config/axios";

const discussion = {
  postDiscussion: (data) => instance.post("/discussion", data),
  getDiscussions: (pageNo, limit) => instance.get(`/discussion/all?pageno=${pageNo}&limit=${limit}`),
  deleteDiscussion: (id) => instance.delete(`/discussion/${id}`),
};

export default discussion;
