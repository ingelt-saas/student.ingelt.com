import instance from "./config/axios";

const notes = {
  getNotes: () => instance.get("/notes/all"),
};

export default notes;
