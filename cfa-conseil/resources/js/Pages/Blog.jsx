
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

export default function Blog({ blog }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    };

    return (
        <>
            <Head title={blog.title} />
            <main className="min-h-screen bg-gray-50">
                {/* Header with decorative elements */}
                <div className="relative overflow-hidden bg-white">
                    <div className="flex justify-between">
                        <div className='absolute left-0 top-0 -z-10 grid grid-cols-3'>
                            <div className='bg-[#252550] w-20 h-20 rounded-full rounded-tl-none'></div>
                            <div className='bg-[#252550] w-20 h-20'><div className='bg-white w-20 h-20 rounded-full rounded-br-none'></div></div>
                            <div className='bg-[#6886ab] w-20 h-20 rounded-full rounded-bl-none'></div>
                            <div className='bg-[#6886ab] w-20 h-20 rounded-full rounded-tr-none'></div>
                            <div className='bg-[#6886ab] w-20 h-20'><div className='bg-white w-20 h-20 rounded-full rounded-tl-none'></div></div>
                            <div></div>
                            <div className='bg-[#252550] w-20 h-20 rounded-full rounded-br-none'></div>
                        </div>
                        <div className='absolute right-0 top-0 -z-10 grid grid-cols-3'>
                            <div className='bg-[#252550] w-20 h-20 rounded-full rounded-tl-none'></div>
                            <div className='bg-[#252550] w-20 h-20'><div className='bg-white w-20 h-20 rounded-full rounded-br-none'></div></div>
                            <div className='bg-[#6886ab] w-20 h-20 rounded-full rounded-bl-none'></div>
                            <div className='bg-[#6886ab] w-20 h-20 rounded-full rounded-tr-none'></div>
                            <div className='bg-[#6886ab] w-20 h-20'><div className='bg-white w-20 h-20 rounded-full rounded-tl-none'></div></div>
                            <div></div>
                            <div className='bg-[#252550] w-20 h-20 rounded-full rounded-br-none'></div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-[#252550] hover:underline font-medium"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Blogs</span>
                        </Link>
                    </div>

                    {/* Blog Header */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-[#252550] mb-6">
                            {blog.title}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>{formatDate(blog.updated_at)}</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>{calculateReadTime(blog.content_html)} min read</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {blog.featured_image && (
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
                            <img
                                src={`/storage/${blog.featured_image}`}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Blog Content */}
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div
                        className="prose prose-lg max-w-none
                                    prose-headings:text-[#252550]
                                    prose-headings:font-bold
                                    prose-h1:text-4xl
                                    prose-h2:text-3xl
                                    prose-h3:text-2xl
                                    prose-h4:text-xl
                                    prose-p:text-gray-700
                                    prose-p:leading-relaxed
                                    prose-a:text-[#6886ab]
                                    prose-a:no-underline
                                    hover:prose-a:underline
                                    prose-strong:text-[#252550]
                                    prose-img:rounded-lg
                                    prose-img:shadow-lg
                                    prose-ul:list-disc
                                    prose-ol:list-decimal"
                        dangerouslySetInnerHTML={{ __html: blog.content_html }}
                    />
                </article>

                {/* Related Posts / Navigation */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/blogs"
                            className="text-[#252550] font-medium hover:underline flex items-center gap-2"
                        >
                            <ArrowLeft size={20} />
                            All Blogs
                        </Link>
                        <Link
                            href="/blog-editor"
                            className="text-[#252550] font-medium hover:underline"
                        >
                            Write New Blog
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

Blog.layout = page => <AppLayout children={page} />;
