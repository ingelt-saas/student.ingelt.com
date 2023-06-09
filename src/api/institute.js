import instance from './config/axios';

const instituteApi = {
    getInstitutes: (mode, location, searchQuery) => instance.get(`/institute/getall?location=${location}&s=${searchQuery}&mode=${mode}`),
    applyInstitute: (data) => instance.post('/institute/apply', data),
    getAppliedInstitutes: () => instance.get(`/institute/applied-institutes`),
};

export default instituteApi;