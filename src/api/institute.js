import instance from './config/axios';

const instituteApi = {
    getInstitutes: (mode, location, searchQuery) => instance.get(`/institute/getall?location=${location}&s=${searchQuery}&mode=${mode}`),
};

export default instituteApi;