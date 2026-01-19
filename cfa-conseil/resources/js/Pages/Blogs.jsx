import React, {useEffect, useState} from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Search, Trash } from 'lucide-react';
import { Link } from "@inertiajs/react";
import { usePage } from '@inertiajs/react';
import { Edit, ArrowRight } from 'lucide-react';
import Toast from "@/Components/ui/Toast.jsx";
import axios from "axios";
import Modal from "@/Components/ui/Modal.jsx";

export default function Blogs({ blogs = [] }) {
    const { auth } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [blogList, setBlogList] = useState(blogs);
    const [toast, setToast] = useState({ message: "", type: "info" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    // Filter blogs based on search term
    const filteredBlogs = blogList.filter(blog =>
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

    const showToast = (message, type = "info") => {
        setToast({ message, type });
    };

    const confirmDeleteBlog = (blog) => {
        setBlogToDelete(blog);
        setShowDeleteModal(true);
    };

    useEffect(() => {
        setBlogList(blogs);
    }, [blogs]);

    const deleteBlog = async () => {
        if (!blogToDelete) return;

        try {
            const response = await axios.delete(`/blogs/${blogToDelete.id}`);
            const result = response.data;

            if (result.success) {
                setBlogList((prev) => prev.filter((b) => b.id !== blogToDelete.id));
                showToast('Article supprimé avec succès', 'success');
            } else {
                showToast('Erreur : ' + (result.message || 'Une erreur inconnue s\'est produite'), 'error');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            showToast(error.response?.data?.message || 'Erreur lors de la suppression de l\'article', 'error');
        } finally {
            setShowDeleteModal(false);
            setBlogToDelete(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-col justify-center">
                <div className="flex justify-between mb-32">
                    <div className='absolute left-0 top-0 -z-10 grid grid-cols-3 '>
                        <div
                            className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tl-none'></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'>
                            <div
                                className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div>
                        </div>
                        <div
                            className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div>
                        <div
                            className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'>
                            <div
                                className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tl-none'></div>
                        </div>
                        <div></div>
                        <div
                            className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div>
                    </div>
                    <div className='absolute right-0 top-0 -z-10 grid grid-cols-3 '>
                        <div
                            className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                        <div className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'>
                            <div
                                className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div>
                        </div>
                        <div
                            className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-tr-none'></div>
                        <div></div>
                        <div
                            className='bg-[#6886ab] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div>
                        <div className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16'>
                            <div
                                className='bg-white w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-bl-none'></div>
                        </div>
                        <div></div>
                        <div></div>
                        <div
                            className='bg-[#252550] w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full rounded-br-none'></div>
                    </div>
                </div>
                <h1 className="text-9xl font-bold text-center text-[#252550]">Articles.</h1>
                <div className="flex justify-center mt-20">
                    <div
                        className="min-w-96 flex items-center justify-center gap-2 bg-[#e5e5e5] border-b-2 border-b-[#252550] px-2 rounded">
                        <input
                            className="border-0 w-full bg-[#e5e5e5] focus:outline-none focus:ring-0"
                            type="text"
                            placeholder="Rechercher des articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search/>
                    </div>
                </div>
                <div
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 my-16 max-w-7xl mx-auto w-full'>
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map(blog => (
                            <div
                                key={blog.id}
                                className='flex flex-col bg-[#eaeaea] rounded-lg overflow-hidden duration-300'>
                                <div className='h-48 bg-[#92aec8] relative overflow-hidden'>
                                    <img
                                        src={`/storage/${blog.featured_image}`}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'storage/images/fallback.png';
                                            e.target.onerror = null;
                                        }}
                                    />
                                    {auth?.user?.role === 'admin' &&
                                        <div
                                            className='absolute right-4 top-4 flex items-center justify-center text-[#252550] bg-white rounded-full w-8 h-8 cursor-pointer hover:bg-red-500 hover:text-white transition-colors'>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    confirmDeleteBlog(blog);
                                                }}
                                                className="w-full h-full flex items-center justify-center"
                                                title="Supprimer l'article"
                                            >
                                                <Trash size={'1em'} />
                                            </button>
                                        </div>
                                    }
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
                                            Lire la suite <ArrowRight size={'1em'}/>
                                        </Link>
                                        {auth?.user?.role === 'admin' && <Link
                                            href={`/blog-editor/${blog.slug}`}
                                            className='flex items-center gap-2 text-[#252550] font-medium hover:underline'
                                        >
                                            Modifier <Edit size={'1em'}/>
                                        </Link>}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">
                                {searchTerm ? 'Aucun article ne correspond à votre recherche.' : 'Aucun article disponible pour le moment.'}
                            </p>
                            {auth?.user?.role === 'admin' &&
                                <Link
                                    href="/blog-editor"
                                    className="mt-4 inline-block bg-[#252550] text-white px-6 py-2 rounded-lg hover:bg-[#1a1a3a] transition-colors"
                                >
                                    Créer le premier article
                                </Link>}
                        </div>
                    )}
                </div>
            </div>

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: "", type: "info" })}
            />

            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} maxWidth="sm">
                <div className="p-6 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Supprimer l'article</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Êtes-vous sûr de vouloir supprimer l'article <strong>{blogToDelete?.title}</strong> ?
                        Cette action est irréversible.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={deleteBlog}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

Blogs.layout = page => {
    return (
        <AppLayout
            children={page}
            seo={{
                title: "Articles",
                description: "Découvrez nos articles et conseils sur la comptabilité, la gestion financière et les bonnes pratiques pour les entreprises.",
                slug: "blogs",
                keywords: "blog comptabilité, conseils financiers, articles gestion d'entreprise",
            }}
        />
    )
};
