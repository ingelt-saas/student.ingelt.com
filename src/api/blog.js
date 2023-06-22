import instance from './config/axios';

const blogApi = {
    getBlogs: () => instance.get(`/blogs`),
};

export default blogApi;