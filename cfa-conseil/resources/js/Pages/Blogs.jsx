import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Search, ImageIcon } from 'lucide-react';
import { Link } from "@inertiajs/react";
import { useAuth } from '@/contexts/AuthContext';
import { usePage } from '@inertiajs/react';
import { Edit, ArrowRight } from 'lucide-react';

export default function Blogs({ blogs = [] }) {
    const { auth } = usePage().props;
    console.log(auth);
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [onImage, setOnImage] = useState(false);

    // Filter blogs based on search term
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex flex-col justify-center">
                <div className="flex justify-between mb-32">
                    <div className='absolute left-0 top-0 -z-10 grid grid-cols-3 '>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tl-none'></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tl-none'></div></div>
                        <div></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div>
                    </div>
                    <div className='absolute right-0 top-0 -z-10 grid grid-cols-3 '>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                        <div></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'><div className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div></div>
                        <div></div>
                        <div></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div>
                    </div>
                </div>
                <h1 className="text-9xl font-bold text-center text-[#252550]">Blogs.</h1>
                <div className="flex justify-center mt-20">
                    <div className="min-w-96 flex items-center justify-center gap-2 bg-[#e5e5e5] border-b-2 border-b-[#252550] px-2 rounded">
                        <input
                            className="border-0 w-full bg-[#e5e5e5] focus:outline-none focus:ring-0"
                            type="text"
                            placeholder="Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search/>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 my-16 max-w-7xl mx-auto w-full'>
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map(blog => (
                            <div
                                key={blog.id}
                                className='flex flex-col bg-[#eaeaea] rounded-lg overflow-hidden duration-300'>
                                <div className='h-48 bg-[#92aec8] relative overflow-hidden'>
                                    <img
                                        src={blog.featured_image ? `/storage/${blog.featured_image}` : 'storage/images/fallback.png'}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'storage/images/fallback.png';
                                            e.target.onerror = null;
                                        }}
                                    />
                                </div>
                                <div className='p-6 grow flex flex-col justify-between'>
                                    <div>
                                      <div className='flex items-center text-sm text-gray-500 mb-2'>
                                        <span>{formatDate(blog.updated_at)}</span>
                                        <span className='mx-2'>•</span>
                                        <span>{Math.ceil((blog.content_html?.length || 0) / 1000)} min read</span>
                                      </div>
                                      <h3 className='text-xl font-bold text-[#252550] mb-3 line-clamp-2'>
                                        {blog.title}
                                      </h3>
                                      <p className='text-gray-600 mb-4 line-clamp-3'>
                                        {blog.excerpt || 'Read this amazing blog post...'}
                                      </p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <Link
                                            href={`/blog/${blog.slug}`}
                                            className='flex items-center gap-2 text-[#252550] font-medium hover:underline'
                                        >
                                            Read More <ArrowRight size={'1em'} />
                                        </Link>
                                        {auth?.user?.role === 'admin' && <Link
                                            href={`/blog-editor/${blog.slug}`}
                                            className='flex items-center gap-2 text-[#252550] font-medium hover:underline'
                                        >
                                            Edit <Edit size={'1em'} />
                                        </Link>}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">
                                {searchTerm ? 'No blogs found matching your search.' : 'No blogs available yet.'}
                            </p>
                            <Link
                                href="/blog-editor"
                                className="mt-4 inline-block bg-[#252550] text-white px-6 py-2 rounded-lg hover:bg-[#1a1a3a] transition-colors"
                            >
                                Create First Blog
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

Blogs.layout = page => <AppLayout children={page} />;
