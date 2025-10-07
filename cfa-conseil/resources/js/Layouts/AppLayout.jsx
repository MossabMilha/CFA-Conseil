import React from 'react';
import Nav from '@/Components/Nav';
import Footer from '@/Components/Footer';
import { useAuth } from '@/contexts/AuthContext';

export default function AppLayout({ children }) {
    const { user } = useAuth();
    
    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}