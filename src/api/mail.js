import axios from 'axios';
import instance from './config/axios';

const URL = process.env.REACT_APP_API_BASE_URL;

const mailApi = {
    contactMail: (data) => new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`${URL}/mail/boardContactQuery`, data);
            resolve(res);
        } catch (err) {
            reject(err);
        }
    }),
    // contactMail: (data) => instance.post('/mail/boardContactQuery', data),
};

export default mailApi;