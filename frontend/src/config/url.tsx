

export const Url = {
    dev: import.meta.env.VITE_DEV_URL || 'http://localhost:3000',
    prod: import.meta.env.VITE_PROD_URL || 'https://pluto-ai-qffm.onrender.com',
}

export const getBaseUrl = () => {
    return import.meta.env.PROD ? Url.prod : Url.dev;
}