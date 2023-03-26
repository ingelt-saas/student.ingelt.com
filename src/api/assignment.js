import instance from "./config/axios";

const assignment = {
  getAllAssignments: () => instance.get("/assignment/all"),
};

export default assignment;
