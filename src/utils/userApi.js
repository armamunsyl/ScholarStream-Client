import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_baseURL?.replace(/\/$/, '') || undefined,
    headers: {
        'Content-Type': 'application/json',
    },
});

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
