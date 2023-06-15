import instance from "./config/axios";

const queryApi = {
  communityQuery: (data) => instance.post("/ingelt/community-query", data),
  universityQuery: (data) => instance.post("/ingelt/university-query", data),
  ieltsPrepQuery: (data) => instance.post("/ingelt/ieltsprep", data),
  loanQuery: (data) => instance.post("/loan-query", data),
  getLoanQuery: (data) => instance.get(`/loan-query/${data}`),
  visaQuery: (data) => instance.post("/visa-query", data),
  getvisaQuery: (data) => instance.get(`/visa-query/${data}`),

  findIELTSQuery: (data) => instance.post("/ingelt/find-ielts-query", data),
};

export default queryApi;
