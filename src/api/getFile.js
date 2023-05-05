import instance from './config/axios';

const getFile = (key) => instance.get(`/files`, { headers: { awskey: key } });

export default getFile;