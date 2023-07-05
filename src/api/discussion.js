import instance from "./config/axios";

const discussion = {
  postDiscussion: (data) =>
    instance.post("/discussion", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  count: () => instance.get("/discussion/count"),
  getDiscussions: (pageNo, limit) =>
    instance.get(`/discussion/all?pageno=${pageNo}&limit=${limit}`),
  deleteDiscussion: (id) => instance.delete(`/discussion/${id}`),
  reportDiscussion: (data) => instance.post('/discussion/discussionReport', data),
};

export default discussion;
