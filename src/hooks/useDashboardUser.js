import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { getUserProfile } from '../utils/userApi';

const useDashboardUser = () => {
    const { user, loading: authLoading, logOut } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshToken, setRefreshToken] = useState(0);
    const refreshProfile = () => setRefreshToken((token) => token + 1);

    useEffect(() => {
        let isMounted = true;

        const loadProfile = async () => {
            if (!user?.email) {
                if (isMounted) {
                    setProfile(null);
                    setLoading(false);
                }
                return;
            }
            try {
                setLoading(true);
                setError('');
                const result = await getUserProfile(user.email);
                if (isMounted) {
                    setProfile(result ?? null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Failed to load profile.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (!authLoading) {
            loadProfile();
        }

        return () => {
            isMounted = false;
        };
    }, [authLoading, user?.email, refreshToken]);
    return {
        authUser: user,
        profile,
        loading: loading || authLoading,
        error,
        logOut,
        refreshProfile,
    };
};

export default useDashboardUser;
