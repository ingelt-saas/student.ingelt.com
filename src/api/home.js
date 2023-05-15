import instance from "./config/axios";

const home = {
  getStudent: () => instance.get("/"),
  getMeetLink: () => instance.get(`/meetLink`),
  getBands: () => instance.get("/bands"),
  getGraphData: () => instance.get("/mockTestMarks"),
  getSubmissions: () => instance.get('/submissions'),
};

export default home;
