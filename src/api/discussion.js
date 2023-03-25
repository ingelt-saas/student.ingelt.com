import instance from "./config/axios";

const discussion = {
  postDiscussion: (data) => instance.post("/discussion", data),
  getDiscussions: () => instance.get("/discussion/all"),
  deleteDiscussion: (id) => instance.delete(`/discussion/${id}`),
};

export default discussion;
