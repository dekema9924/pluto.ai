// src/utils/deviceInfo.ts

export function getDeviceType(): string {
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone|iPod/i.test(ua)) return 'Mobile';
    if (/Tablet|iPad/i.test(ua)) return 'Tablet';
    return 'Desktop';
}

export function getBrowser(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
    if (ua.includes('Trident') || ua.includes('MSIE')) return 'Internet Explorer';
    return 'Unknown';
}

export function getOS(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Windows NT')) return 'Windows';
    if (ua.includes('Mac OS X') && !ua.includes('iPhone') && !ua.includes('iPad')) return 'macOS';
    if (/Android/i.test(ua)) return 'Android';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
    if (/Linux/i.test(ua)) return 'Linux';
    return 'Unknown';
}
