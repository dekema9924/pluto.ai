import axios from 'axios';

export async function getIpInfo(): Promise<string | null> {
    try {
        const res = await axios.get('https://ipapi.co/json/');
        const { ip, city, country_code } = res.data;
        return `${ip} (${city}, ${country_code})`;
    } catch (error) {
        console.error('Error fetching IP/location:', error);
        return null;
    }
}

