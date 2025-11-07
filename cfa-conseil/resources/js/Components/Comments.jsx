import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import axios from "axios";

export default function Comments({ blogId, userId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/blogs/${blogId}/comments`);
      if (Array.isArray(res.data)) {
        setComments(res.data);
      } else {
        console.error("Expected array but got:", res.data);
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleAddComment = async (parentId = null) => {
    if (!userId) return; // prevent non-logged-in users from posting

    const content = parentId ? replyContent : newComment;
    if (!content.trim()) return;

    try {
      await axios.post(`/api/blogs/${blogId}/comments`, {
        user_id: userId,
        blog_id: blogId,
        content,
        parent_id: parentId,
      });

      setNewComment("");
      setReplyContent("");
      setReplyingTo(null);
      fetchComments();
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  // Recursive rendering for nested comments
  const renderComments = (list = [], parent = null) => {
    return list
      .filter((c) => c.parent_id === parent)
      .map((comment) => (
        <Card key={comment.id} className="my-2 ml-0 md:ml-4 bg-white shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-[#252550]" />
              <span className="font-semibold">
                {comment.user?.first_name + ' ' + comment.user?.last_name || "User"}
              </span>
            </div>
            <p className="text-[#252550] mb-2 bg-white p-2 rounded">{comment.content}</p>

            {userId && ( // only show reply area if logged in
              replyingTo === comment.id ? (
                <div className="mt-2">
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="mb-2"
                  />
                  <div className="flex gap-2">
                    <Button className="bg-[#252550] hover:bg-[#1d1d45]" onClick={() => handleAddComment(comment.id)}>Reply</Button>
                    <Button variant="outline" onClick={() => setReplyingTo(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-[#252550]"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  Reply
                </Button>
              )
            )}

            {/* Nested replies */}
            <div className="ml-6 mt-2 border-l pl-4">
              {renderComments(list, comment.id)}
            </div>
          </CardContent>
        </Card>
      ));
  };

  return (
    <div className="mt-12 w-full">
      {!userId &&
        <div className="flex items-center gap-2 mb-4">
          <Button className="bg-[#252550] hover:bg-[#1d1d45]">
            <a href="/login" className="text-white">
              Login to comment
            </a>
          </Button>
        </div>
      }

      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-[#252550]">Comments</h2>

        {/* Add new comment only if logged in */}

        {userId && <Card className="mb-4 shadow-none">
          <CardContent className="p-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="mb-2 shadow-none"
            />
            <Button
              className="bg-[#252550] hover:bg-[#1d1d45]"
              onClick={() => handleAddComment()}
            > Post Comment
            </Button>
          </CardContent>
        </Card>}

        {/* Comments list */}
        {comments.length > 0 ? (
          renderComments(comments)
        ) : (
          <p className="text-gray-500">No comments yet</p>
        )}
      </div>
    </div>
  );
}
