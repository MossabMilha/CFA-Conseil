import React from 'react';
import Nav from '@/Components/Nav';
import Footer from '@/Components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import SeoHead from "@/Components/SeoHead.jsx";

export default function AppLayout({ children, seo }) {
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            {<SeoHead {...seo} />}
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
}
