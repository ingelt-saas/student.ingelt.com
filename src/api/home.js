import instance from "./config/axios";

const home = {
  getStudent: () => instance.get("/"),
  getMeetLink: (batchId) => instance.get(`/meetLink/${batchId}`),
  getBands: () => instance.get("/bands"),
  getGraphData: () => instance.get("/mockTestMarks"),
};

export default home;
