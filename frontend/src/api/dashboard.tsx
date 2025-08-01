import axiosInstance from '../utils/axiosInstance';


export const apiUsage = async () => {
    const res = await axiosInstance.get('/dashboard/stats');
    console.log(res.data)
    return res;
}
