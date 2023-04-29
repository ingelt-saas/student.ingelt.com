import instance from './config/axios';

const getFile = async (key) => {
    const result = await instance.get(`/files`, { headers: { awskey: key } });
    return result?.data;
};

export default getFile;