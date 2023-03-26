import instance from "./config/axios";

const home = {
  getStudent: () => instance.get("/"),
  getMeetLink: () => instance.get(`/meetLink`),
  getBands: () => instance.get("/bands"),
  getGraphData: () => instance.get("/mockTestMarks"),
};

export default home;
