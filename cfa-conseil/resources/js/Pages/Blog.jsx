
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import Comments from '@/Components/Comments';
import  '../../css/tiptap/editor-content.css'

export default function Blog({ blog, auth }) {
    const fallbackImg = `${import.meta.env.VITE_APP_URL}:${import.meta.env.VITE_APP_PORT}/storage/images/fallback.png`;
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
            <main>
                {/* Header with decorative elements */}
                <div className="relative">
                    <div className="flex justify-between h-60">
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
                </div>

                <div className=" max-w-4xl mx-auto mb-12 p-4">
                    {/* Back Button */}
                    <div className="mb-4">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-[#252550] hover:underline font-medium"
                        >
                            <ArrowLeft size={20}/>
                            <span>Back to Blogs</span>
                        </Link>
                    </div>

                    {/* Blog Header */}
                    <div className="mb-8 flex flex-col gap-3">
                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-[#252550]">
                            {blog.title}
                        </h1>

                        <h2 className="text-lg text-gray-600">
                            {blog.excerpt}
                        </h2>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar size={18}/>
                                <span>{formatDate(blog.updated_at)}</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <div className="flex items-center gap-2">
                                <Clock size={18}/>
                                <span>{calculateReadTime(blog.content_html)} min read</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {blog.featured_image && (
                        <div className="">
                            <div className="aspect-video w-full rounded-lg overflow-hidden">
                                <img
                                    src={`/storage/${blog.featured_image}`}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = fallbackImg;
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Blog Content */}
                    <article className="mb-4 mt-8">
                        <div
                            className="editor-content"
                            dangerouslySetInnerHTML={{__html: blog.content_html}}
                        />
                    </article>

                    {/* Related Posts / Navigation */}
                    <div className=" border-t border-gray-200 pt-4 mt-8">
                        <div className="flex justify-between items-center">
                            <Link
                                href="/blogs"
                                className="text-[#252550] font-medium hover:underline flex items-center gap-1"
                            >
                                <ArrowLeft size={20}/>
                                All Blogs
                            </Link>
                            {auth?.user?.role === 'admin' && <Link
                                href="/blog-editor"
                                className="text-[#252550] font-medium hover:underline"
                            >
                                Write New Blog
                            </Link>}
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <Comments blogId={blog.id} userId={auth?.user?.id || null} />
                    </div>
                </div>
            </main>
        </>
    );
}

Blog.layout = page => {
    const { blog } = page.props;

    return (
        <AppLayout
            children={page}
            seo={{
                title: blog?.title,
                description: blog?.excerpt || blog?.content_html?.substring(0, 160) || "Article de blog sur la comptabilité et la gestion financière.",
                image: blog?.featured_image ? `/storage/${blog.featured_image}` : null,
                slug: `blog/${blog?.slug}`,
                keywords: blog?.title ? `${blog.title}, comptabilité, finance, entreprise` : "comptabilité, gestion financière",
            }}
        />
    )
};
