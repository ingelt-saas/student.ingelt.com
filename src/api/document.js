import instance from "./config/axios";

const documents = {
  getDocuments: () => instance.get("/document/all"),
};

export default documents;
