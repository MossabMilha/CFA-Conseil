import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Send,
    Clock,
    XCircle,
    MessageSquare,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import Toast from "@/Components/ui/Toast.jsx";

const Comments = ({ blogId, auth }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [guestName, setGuestName] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [expandedReplies, setExpandedReplies] = useState({});
    const [toast, setToast] = useState({ message: "", type: "info" });

    const showToast = (message, type = "info") => {
        setToast({ message, type });
    };

    useEffect(() => {
        fetchComments();
    }, [blogId]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/blogs/${blogId}/comments`);
            // Ensure it's always an array
            setComments(Array.isArray(response.data) ? response.data : []);
            console.log(comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
            showToast("Échec du chargement des commentaires.", "error");
        } finally {
            setLoading(false);
        }
    };


    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };


    const submitComment = async () => {
        if (!newComment.trim()) return;

        if (!auth?.user) {
            if (!guestName.trim() || !guestEmail.trim()) {
                showToast("Veuillez entrer votre nom et email.", "error");
                return;
            }
            if (!isValidEmail(guestEmail.trim())) {
                showToast("Veuillez entrer un email valide.", "error");
                return;
            }
        }

        const payload = { content: newComment.trim() };
        if (!auth?.user) {
            payload.name = guestName.trim();
            payload.email = guestEmail.trim();
        }

        try {
            const response = await axios.post(`/blogs/${blogId}/comments`, payload);
            showToast(response.data.message || "Commentaire publié avec succès !", "success");
            setNewComment("");
            setGuestName("");
            setGuestEmail("");
            if (response.status === 201) fetchComments();
        } catch (error) {
            console.error("Error posting comment:", error);

            const message =
                error.response?.data?.data?.message ||
                "Échec de la publication du commentaire.";
            showToast(message, "error");
        }
    };

    const submitReply = async (parentId) => {
        if (!replyContent.trim()) return;

        if (!auth?.user) {
            if (!guestName.trim() || !guestEmail.trim()) {
                showToast("Veuillez entrer votre nom et email avant de répondre.", "error");
                return;
            }
            if (!isValidEmail(guestEmail.trim())) {
                showToast("Veuillez entrer un email valide.", "error");
                return;
            }
        }

        const payload = {
            content: replyContent.trim(),
            parent_id: parentId,
        };

        if (!auth?.user) {
            payload.name = guestName.trim();
            payload.email = guestEmail.trim();
        }

        try {
            const response = await axios.post(`/blogs/${blogId}/comments`, payload);
            showToast(response.data.message || "Réponse publiée avec succès !", "success");
            setReplyContent("");
            setReplyTo(null);
            fetchComments();
        } catch (error) {
            console.error("Error posting reply:", error);
            showToast("Échec de la publication de la réponse.", "error");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const toggleReplies = (commentId) => {
        setExpandedReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const renderComment = (comment, isReply = false) => {
        const hasReplies = comment.replies && comment.replies.length > 0;
        const isExpanded = expandedReplies[comment.id];

        return (
            <div
                key={comment.id}
                className={`${isReply ? "ml-8 mt-4 border-l-2 border-gray-200 pl-4" : "mb-6"}`}
            >
                <div
                    className={`bg-white rounded-lg p-4 shadow-sm ${isReply ? "border border-gray-100" : ""}`}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-[#252550] text-white rounded-full flex items-center justify-center">
                                {comment.user?.first_name?.charAt(0) ||
                                    comment.name?.charAt(0) ||
                                    "G"}
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">
                                    {comment.user
                                        ? `${comment.user.first_name} ${comment.user.last_name}`
                                        : comment.name || "Guest"}
                                </h4>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <Clock size={12} />
                                    <span>{formatDate(comment.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-700 mb-3">{comment.content}</p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => {
                                    if (replyTo === comment.id) {
                                        setReplyTo(null);
                                        setReplyContent("");
                                    } else {
                                        setReplyTo(comment.id);
                                        setReplyContent("");
                                    }
                                }}
                                className={`flex items-center space-x-1 text-sm ${
                                    replyTo === comment.id
                                        ? "text-[#252550] font-medium"
                                        : "text-gray-600 hover:text-[#252550]"
                                }`}
                            >
                                <MessageSquare size={14} />
                                <span>{replyTo === comment.id ? "Annuler la réponse" : "Répondre"}</span>
                            </button>

                            {hasReplies && (
                                <button
                                    onClick={() => toggleReplies(comment.id)}
                                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-[#252550]"
                                >
                                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    <span>
                    {hasReplies
                        ? `${comment.replies.length} ${
                            comment.replies.length === 1 ? "réponse" : "réponses"
                        }`
                        : ""}
                  </span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Reply Form */}
                    {replyTo === comment.id && (
                        <div className="mt-4 pl-2 border-l-2 border-[#252550]">
              <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Écrivez votre réponse ici..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#252550] focus:border-transparent"
                  rows="2"
              />
                            <div className="mt-2 flex justify-end space-x-2">
                                <button
                                    onClick={() => {
                                        setReplyTo(null);
                                        setReplyContent("");
                                    }}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={() => submitReply(comment.id)}
                                    className="px-4 py-2 bg-[#252550] text-white text-sm rounded-lg hover:bg-[#1a1a3d] disabled:opacity-50"
                                    disabled={!replyContent.trim()}
                                >
                                    Répondre
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Replies */}
                    {hasReplies && isExpanded && (
                        <div className="mt-4">
                            {comment.replies.map((reply) => renderComment(reply, true))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="w-full max-w-4xl mt-12">
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#252550] mx-auto"></div>
                    <p className="mt-2 text-gray-600">Chargement des commentaires...</p>
                </div>
            </div>
        );
    }

    // Organize comments
    const topLevelComments = comments.filter((c) => !c.parent_id);
    const replies = comments.filter((c) => c.parent_id);
    const repliesByParent = {};
    replies.forEach((reply) => {
        if (!repliesByParent[reply.parent_id]) {
            repliesByParent[reply.parent_id] = [];
        }
        repliesByParent[reply.parent_id].push(reply);
    });
    const organizedComments = topLevelComments.map((c) => ({
        ...c,
        replies: repliesByParent[c.id] || [],
    }));

    return (
        <div className="w-full max-w-4xl mt-12">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#252550] mb-4">
                    Commentaires ({organizedComments.length + replies.length})
                </h3>

                {/* Comment Form */}
                <div className="mb-6 bg-white rounded-lg p-4 shadow-sm">
                    {!auth?.user && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Votre nom"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#252550] focus:border-transparent"
                            />
                            <input
                                type="email"
                                placeholder="Votre email"
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#252550] focus:border-transparent"
                            />
                        </div>
                    )}
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Écrivez votre commentaire ici..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#252550] focus:border-transparent"
                        rows="3"
                    />
                    <div className="mt-3 flex justify-end items-center">
                        <button
                            onClick={submitComment}
                            className="px-6 py-2 bg-[#6885ab] text-white rounded-lg hover:bg-[#485d77] disabled:opacity-50"
                            disabled={
                                !newComment.trim() ||
                                (!auth?.user && (!guestName.trim() || !guestEmail.trim()))
                            }
                        >
                            <Send className="inline mr-2" size={18} />
                            Commenter
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                {organizedComments.length === 0 ? (
                    <div className="text-center py-8 bg-[#ecf2fa]/50 rounded-lg">
                        <XCircle className="mx-auto text-[#6885ab]" size={48} />
                        <p className="mt-3 text-[#485d77]">
                            Aucun commentaire pour le moment. Soyez le premier à commenter !
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {organizedComments.map((comment) => renderComment(comment))}
                    </div>
                )}
            </div>

            {toast.message && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ message: "", type: "info" })}
                />
            )}
        </div>
    );
};

export default Comments;
