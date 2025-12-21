import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_baseURL?.replace(/\/$/, '') || undefined,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const storeJwtToken = async (email) => {
    if (!email || !apiClient.defaults.baseURL) return null;
    const { data } = await apiClient.post('/jwt', { email });
    if (data?.token) {
        localStorage.setItem('access-token', data.token);
        return data.token;
    }
    return null;
};

export const clearJwtToken = () => {
    localStorage.removeItem('access-token');
};

export const saveUser = async ({ name, email, photoURL = '', createdAt }) => {
    if (!apiClient.defaults.baseURL) {
        throw new Error('API base URL is not configured');
    }

    const payload = {
        name,
        email,
        photoURL,
        createdAt: createdAt || new Date().toISOString(),
    };

    const { data } = await apiClient.post('/users', payload);
    return data;
};

export const getUserProfile = async (email) => {
    if (!apiClient.defaults.baseURL) {
        throw new Error('API base URL is not configured');
    }
    if (!email) {
        throw new Error('Email is required');
    }

    const { data } = await apiClient.get('/users', {
        params: { email },
    });

    if (Array.isArray(data)) {
        const matched = data.find((item) => item?.email?.toLowerCase() === email.toLowerCase());
        return matched ?? data[0];
    }

    if (data?.email?.toLowerCase() === email.toLowerCase()) {
        return data;
    }

    return null;
};

export const saveFirebaseCredential = async (credential, { fallbackName = 'Google User' } = {}) => {
    const firebaseUser = credential?.user;
    if (!firebaseUser?.email) {
        return null;
    }

    const { metadata } = firebaseUser;
    const isNewUser =
        credential?._tokenResponse?.isNewUser ??
        (metadata?.creationTime && metadata?.creationTime === metadata?.lastSignInTime);

    if (!isNewUser) {
        return null;
    }

    return saveUser({
        name: firebaseUser.displayName || fallbackName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || '',
        createdAt: metadata?.creationTime || new Date().toISOString(),
    });
};
