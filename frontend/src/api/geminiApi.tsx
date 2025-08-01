import axiosInstance from '../utils/axiosInstance';


export const getArticle = async (topic: string, length: string) => {
    const res = await axiosInstance.post('/api/write-article', { topic, length });
    console.log(res.data)
    return res;
}

export const generateImage = async (description: string, style: string, isPublic: boolean) => {
    const res = await axiosInstance.post('/api/generate-image', { description, style, isPublic });
    console.log(res.data)
    return res;
}



export const reviewResume = async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);

    const res = await axiosInstance.post('/api/resume-review', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    // console.log(res.data);
    return res;
}