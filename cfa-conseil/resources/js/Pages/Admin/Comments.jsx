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
        <AppLayout>
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
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Pending Comments ({pendingComments.length})</h1>

                <div className="overflow-x-auto bg-white rounded-md">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-100 text-[#252550] border-b border-[#6886ab]">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Guest Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Guest Email</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Blog ID</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Comment</th>
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
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => openModal('delete', comment)}
                                            className="px-3 py-1 text-red-600 hover:text-white rounded hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-500 text-sm">
                                    No pending comments
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
                        {modalAction === 'approve' ? 'Approve Comment' : 'Delete Comment'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to {modalAction} this comment?
                    </p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={(e) => closeModal(e)}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAction}
                            className={`px-4 py-2 rounded text-white ${
                                modalAction === 'approve' ? 'bg-[#6886ab] hover:bg-[#557299]' : 'bg-red-600 hover:bg-red-700'
                            }`}
                        >
                            {modalAction === 'approve' ? 'Approve' : 'Delete'}
                        </button>
                    </div>
                </div>
            </Modal>
        </AppLayout>
    );
}
