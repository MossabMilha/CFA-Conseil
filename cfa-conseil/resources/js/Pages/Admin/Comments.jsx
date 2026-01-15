import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import axios from 'axios';

export default function AdminComments({ pendingComments }) {
    const approveComment = async (commentId) => {
        if (confirm('Approve this comment?')) {
            try {
                await axios.post(`/api/comments/${commentId}/approve`, {}, {
                    withCredentials: true
                });
                window.location.reload();
            } catch (error) {
                console.error('Error approving comment:', error);
            }
        }
    };

    const deleteComment = async (commentId) => {
        if (confirm('Delete this comment?')) {
            try {
                await axios.delete(`/api/comments/${commentId}`);
                window.location.reload();
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
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
                            <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
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
                                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                                        {comment.user
                                            ? `${comment.user.first_name} ${comment.user.last_name}`
                                            : 'Guest'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{comment.blog_id}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs break-words">
                                        {comment.content}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        {new Date(comment.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => approveComment(comment.id)}
                                            className="px-3 py-1 text-[#6886ab] hover:text-white rounded hover:bg-[#6886ab] transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => deleteComment(comment.id)}
                                            className="px-3 py-1 text-red-600 hover:text-white rounded hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8 text-gray-500 text-sm"
                                >
                                    No pending comments
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
