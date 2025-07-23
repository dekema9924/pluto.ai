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
    // console.log(res.data)
    return res;
};

export const signoutUser = async () => {
    const res = await axiosInstance.post('/auth/signout');
    // console.log(res.data)
    return res;
}

export const addProfileImage = async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const res = await axiosInstance.post('/auth/uploadprofile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    // console.log(res.data);
    return res;
}

export const updatePassword = async (new_password: string, confirm_password: string) => {
    const res = await axiosInstance.post('/auth/resetpassword', { new_password, confirm_password });
    // console.log(res.data)
    return res;
}
