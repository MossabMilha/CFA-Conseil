import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Authenticated({ children, title }) {
    const { user, setUser } = useAuth();
    const { auth } = usePage().props;

    useEffect(() => {
        // Sync the auth user from Inertia with our context
        if (auth?.user) {
            setUser(auth.user);
        }
    }, [auth?.user, setUser]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>{title ? `${title} - ${import.meta.env.VITE_APP_NAME}` : import.meta.env.VITE_APP_NAME}</title>
            </Head>

            {children}
        </div>
    );
}
