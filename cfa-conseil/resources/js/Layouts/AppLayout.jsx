// resources/js/Layouts/AppLayout.jsx
import React from 'react';
import Nav from '@/Components/Nav';
import Footer from '@/Components/Footer';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            {children}
            <Footer />
        </div>
    );
}