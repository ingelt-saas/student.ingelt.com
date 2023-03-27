import instance from "./config/axios";

const settings = {
    updateProfile: (data) => instance.get("/settings/updateProfile", data),
};

export default settings;