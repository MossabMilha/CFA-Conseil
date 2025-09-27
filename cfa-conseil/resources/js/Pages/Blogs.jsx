import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Search } from 'lucide-react';

export default function Blogs() {
    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex flex-col justify-center">
                <div className="flex justify-between"> 
                    <div className=' left-0 top-0 -z-10 grid grid-cols-3 '>
                        <div className='bg-[#252550] w-20 h-20 rounded-full rounded-tl-none'></div>
                        <div className='bg-[#252550] w-20 h-20'><div className='bg-white w-20 h-20 rounded-full rounded-br-none'></div></div>
                        <div className='bg-[#6886ab] w-20 h-20 rounded-full rounded-bl-none'></div>
                        <div className='bg-[#6886ab] w-20 h-20 rounded-full rounded-tr-none'></div>
                        <div className='bg-[#6886ab] w-20 h-20'><div className='bg-white w-20 h-20 rounded-full rounded-tl-none'></div></div>
                        <div></div>
                        <div className='bg-[#252550] w-20 h-20 rounded-full rounded-br-none'></div>
                    </div>
                    <div className=' right-0 top-0 -z-10 grid grid-cols-3 '>
                        <div className='bg-[#252550] w-20 h-20 rounded-full rounded-tl-none'></div>
                        <div className='bg-[#252550] w-20 h-20'><div className='bg-white w-20 h-20 rounded-full rounded-br-none'></div></div>
                        <div className='bg-[#6886ab] w-20 h-20 rounded-full rounded-bl-none'></div>
                        <div className='bg-[#6886ab] w-20 h-20 rounded-full rounded-tr-none'></div>
                        <div className='bg-[#6886ab] w-20 h-20'><div className='bg-white w-20 h-20 rounded-full rounded-tl-none'></div></div>
                        <div></div>
                        <div className='bg-[#252550] w-20 h-20 rounded-full rounded-br-none'></div>
                    </div>
                </div>
                <h1 className="text-9xl font-bold text-center text-[#252550]">Blogs.</h1>
                <div className="flex justify-center mt-20">
                    <div className="min-w-96 flex items-center justify-center gap-2 bg-[#e5e5e5] border-b-2 border-b-[#252550] px-2 rounded">
                        <input className="border-0 w-full bg-[#e5e5e5]" type="text" placeholder="Search" /> <Search/>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 my-16 max-w-7xl mx-auto w-full'>
                    {/* Blog Card 1 */}
                    <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                        <div className='h-48 bg-[#92aec8] relative'>
                            <div className='absolute top-4 left-4 bg-[#252550] text-white px-3 py-1 rounded-full text-sm'>
                                Category
                            </div>
                        </div>
                        <div className='p-6'>
                            <div className='flex items-center text-sm text-gray-500 mb-2'>
                                <span>Sep 28, 2025</span>
                                <span className='mx-2'>•</span>
                                <span>5 min read</span>
                            </div>
                            <h3 className='text-xl font-bold text-[#252550] mb-3 line-clamp-2'>
                                Blog Post Title That Can Span Multiple Lines If Needed
                            </h3>
                            <p className='text-gray-600 mb-4 line-clamp-3'>
                                A brief excerpt from the blog post that gives readers a preview of the content. This text will be truncated after a few lines.
                            </p>
                            <button className='text-[#252550] font-medium hover:underline'>
                                Read More →
                            </button>
                        </div>
                    </div>

                    {/* Blog Card 2 */}
                    <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                        <div className='h-48 bg-[#d7d7d7] relative'>
                            <div className='absolute top-4 left-4 bg-[#252550] text-white px-3 py-1 rounded-full text-sm'>
                                Insights
                            </div>
                        </div>
                        <div className='p-6'>
                            <div className='flex items-center text-sm text-gray-500 mb-2'>
                                <span>Sep 25, 2025</span>
                                <span className='mx-2'>•</span>
                                <span>3 min read</span>
                            </div>
                            <h3 className='text-xl font-bold text-[#252550] mb-3 line-clamp-2'>
                                Another Interesting Blog Post Title
                            </h3>
                            <p className='text-gray-600 mb-4 line-clamp-3'>
                                This is another example of a blog post excerpt that provides a preview of the content to entice readers.
                            </p>
                            <button className='text-[#252550] font-medium hover:underline'>
                                Read More →
                            </button>
                        </div>
                    </div>

                    {/* Blog Card 3 */}
                    <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                        <div className='h-48 bg-[#252550] relative'>
                            <div className='absolute top-4 left-4 bg-[#92aec8] text-[#252550] px-3 py-1 rounded-full text-sm font-medium'>
                                News
                            </div>
                        </div>
                        <div className='p-6'>
                            <div className='flex items-center text-sm text-gray-500 mb-2'>
                                <span>Sep 20, 2025</span>
                                <span className='mx-2'>•</span>
                                <span>7 min read</span>
                            </div>
                            <h3 className='text-xl font-bold text-[#252550] mb-3 line-clamp-2'>
                                Latest Updates and Industry News
                            </h3>
                            <p className='text-gray-600 mb-4 line-clamp-3'>
                                Stay updated with the latest trends and news in the industry with our comprehensive coverage.
                            </p>
                            <button className='text-[#252550] font-medium hover:underline'>
                                Read More →
                            </button>
                        </div>
                    </div>

                    {/* Blog Card 4 */}
                    <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                        <div className='h-48 bg-[#92aec8] relative'>
                            <div className='absolute top-4 left-4 bg-[#252550] text-white px-3 py-1 rounded-full text-sm'>
                                Category
                            </div>
                        </div>
                        <div className='p-6'>
                            <div className='flex items-center text-sm text-gray-500 mb-2'>
                                <span>Sep 28, 2025</span>
                                <span className='mx-2'>•</span>
                                <span>5 min read</span>
                            </div>
                            <h3 className='text-xl font-bold text-[#252550] mb-3 line-clamp-2'>
                                Blog Post Title That Can Span Multiple Lines If Needed
                            </h3>
                            <p className='text-gray-600 mb-4 line-clamp-3'>
                                A brief excerpt from the blog post that gives readers a preview of the content. This text will be truncated after a few lines.
                            </p>
                            <button className='text-[#252550] font-medium hover:underline'>
                                Read More →
                            </button>
                        </div>
                    </div>

                    {/* Blog Card 5 */}
                    <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                        <div className='h-48 bg-[#92aec8] relative'>
                            <div className='absolute top-4 left-4 bg-[#252550] text-white px-3 py-1 rounded-full text-sm'>
                                Category
                            </div>
                        </div>
                        <div className='p-6'>
                            <div className='flex items-center text-sm text-gray-500 mb-2'>
                                <span>Sep 28, 2025</span>
                                <span className='mx-2'>•</span>
                                <span>5 min read</span>
                            </div>
                            <h3 className='text-xl font-bold text-[#252550] mb-3 line-clamp-2'>
                                Blog Post Title That Can Span Multiple Lines If Needed
                            </h3>
                            <p className='text-gray-600 mb-4 line-clamp-3'>
                                A brief excerpt from the blog post that gives readers a preview of the content. This text will be truncated after a few lines.
                            </p>
                            <button className='text-[#252550] font-medium hover:underline'>
                                Read More →
                            </button>
                        </div>
                    </div>

                    {/* Blog Card 6 */}
                    <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                        <div className='h-48 bg-[#92aec8] relative'>
                            <div className='absolute top-4 left-4 bg-[#252550] text-white px-3 py-1 rounded-full text-sm'>
                                Category
                            </div>
                        </div>
                        <div className='p-6'>
                            <div className='flex items-center text-sm text-gray-500 mb-2'>
                                <span>Sep 28, 2025</span>
                                <span className='mx-2'>•</span>
                                <span>5 min read</span>
                            </div>
                            <h3 className='text-xl font-bold text-[#252550] mb-3 line-clamp-2'>
                                Blog Post Title That Can Span Multiple Lines If Needed
                            </h3>
                            <p className='text-gray-600 mb-4 line-clamp-3'>
                                A brief excerpt from the blog post that gives readers a preview of the content. This text will be truncated after a few lines.
                            </p>
                            <button className='text-[#252550] font-medium hover:underline'>
                                Read More →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

Blogs.layout = page => <AppLayout children={page} />;