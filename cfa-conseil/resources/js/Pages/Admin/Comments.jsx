import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import axios from 'axios';
import Modal from '@/Components/ui/Modal';

export default function AdminComments({ pendingComments }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(null); // 'approve' or 'delete'
    const [selectedComment, setSelectedComment] = useState(null);

    const openModal = (action, comment) => {
        setModalAction(action);
        setSelectedComment(comment);
        setModalOpen(true);
    };

    const closeModal = (e) => {
        if (e) e.stopPropagation();
        setModalOpen(false);
        setTimeout(() => {
            setModalAction(null);
            setSelectedComment(null);
        }, 200);
    };


    const handleAction = async () => {
        if (!selectedComment) return;

        try {
            if (modalAction === 'approve') {
                await axios.post(`/comments/${selectedComment.id}/approve`, {}, { withCredentials: true });
            } else if (modalAction === 'delete') {
                await axios.delete(`/comments/${selectedComment.id}`);
            }
            window.location.reload();
        } catch (error) {
            console.error(`Error ${modalAction} comment:`, error);
        } finally {
            closeModal();
        }
    };

    return (
        <AppLayout
            seo={{
                title: "Commentaires Admin",
                description: "Gérer et modérer les commentaires des utilisateurs depuis le tableau de bord admin.",
                slug: "admin/comments",
                keywords: "commentaires admin, gérer commentaires, modérer commentaires, retours utilisateurs",
            }}
        >
            <div className="flex justify-between mb-48">
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
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Commentaires en attente ({pendingComments.length})</h1>

                <div className="overflow-x-auto bg-white rounded-md">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-100 text-[#252550] border-b border-[#6886ab]">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Nom du visiteur</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Email du visiteur</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">ID de l'article</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Commentaire</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pendingComments.length > 0 ? (
                            pendingComments.map((comment) => (
                                <tr key={comment.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">{comment.name || '—'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{comment.email || '—'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{comment.blog_id}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs break-words">{comment.content}</td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{new Date(comment.created_at).toLocaleString()}</td>
                                    <td className="px-4 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => openModal('approve', comment)}
                                            className="px-3 py-1 text-[#6886ab] hover:text-white rounded hover:bg-[#6886ab] transition-colors"
                                        >
                                            Approuver
                                        </button>
                                        <button
                                            onClick={() => openModal('delete', comment)}
                                            className="px-3 py-1 text-red-600 hover:text-white rounded hover:bg-red-600 transition-colors"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-500 text-sm">
                                    Aucun commentaire en attente
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <Modal show={modalOpen} onClose={closeModal} maxWidth="sm">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {modalAction === 'approve' ? 'Approuver le commentaire' : 'Supprimer le commentaire'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Êtes-vous sûr de vouloir {modalAction === 'approve' ? 'approuver' : 'supprimer'} ce commentaire ?
                    </p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={(e) => closeModal(e)}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleAction}
                            className={`px-4 py-2 rounded text-white ${
                                modalAction === 'approve' ? 'bg-[#6886ab] hover:bg-[#557299]' : 'bg-red-600 hover:bg-red-700'
                            }`}
                        >
                            {modalAction === 'approve' ? 'Approuver' : 'Supprimer'}
                        </button>
                    </div>
                </div>
            </Modal>
        </AppLayout>
    );
}
