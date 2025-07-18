import axiosInstance from '../utils/axiosInstance';


export const createuser = async (email: string, password: string, name: string) => {
    const res = await axiosInstance.post('/auth/signup', { email, password, name });
    console.log(res.data)
    return res;
};

export const loginUser = async (email: string, password: string) => {
    const res = await axiosInstance.post('/auth/signin', { email, password });
    console.log(res.data)
    return res;
};

export const fetchUserProfile = async () => {
    const res = await axiosInstance.get('/auth/profile');
    console.log(res.data)
    return res;
};
