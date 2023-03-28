import instance from "./config/axios";

const settings = {
    updateProfile: (data) => instance.put("/settings/updateProfile", data),
    update: (data) => instance.put('/settings', data),
    updatePassword: (data) => instance.put('/settings/updatePassword', data),
};

export default settings;