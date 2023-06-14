import instance from "./config/axios"

const queryApi = {
    communityQuery: (data) => instance.post('/ingelt/community-query', data),
    universityQuery: (data) => instance.post('/ingelt/university-query', data),
    ieltsPrepQuery: (data) => instance.post('/ingelt/ieltsprep', data),
    loanQuery: (data) => instance.post('/ingelt/loan-query', data),
    visaQuery: (data) => instance.post('/ingelt/visa-query', data),
    findIELTSQuery: (data) => instance.post('/ingelt/find-ielts-query', data)
};

export default queryApi;