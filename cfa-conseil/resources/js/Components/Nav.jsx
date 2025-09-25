import React from 'react';

export default function Nav() {
    return (
        <nav className="flex justify-center absolute left-1/2 transform -translate-x-1/2 mx-auto my-4">
            <div className='bg-[#252550] w-16 h-16 rounded-full rounded-bl-none'></div>
            <div className="flex items-center justify-between bg-[#252550] rounded-full px-8 min-w-[820px]">
                <h1 className='text-white'>CFA-Conseil</h1>
                <ul className="flex text-white space-x-4">
                    <li><a href="/about">a propos</a></li>
                    <li><a href="/services">services</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a className='text-[#252550] bg-white rounded-full px-2 py-1' href="/contact">Contact Us</a></li>
                </ul>
            </div>
            <div className='bg-[#252550] w-16 h-16 rounded-full rounded-tr-none'></div>
        </nav>
    );
}