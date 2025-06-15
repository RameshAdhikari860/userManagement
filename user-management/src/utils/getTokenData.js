import { jwtDecode } from 'jwt-decode';

export const getTokenData = () => {
    if (typeof document === 'undefined') {
        console.warn("getTokenData: document is not available (SSR context)");
        return null;
    }

    const match = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='));

    const token = match?.split('=')[1];

    if (token) {
        try {
            const decoded = jwtDecode(token);
            // console.log("Decoded token:", decoded);
            return decoded;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    } else {
        console.warn("authToken cookie not found");
        return null;
    }
};
