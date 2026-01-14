import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useComments } from "../../context/CommentContext";
import CommentReply from "./CommentReply";

const CommentItem = ({ comment }) => {
  const { user } = useAuth();
  const { updateComment, deleteComment, likeComment, dislikeComment } =
    useComments();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showReply, setShowReply] = useState(false);
  const [error, setError] = useState("");

  const isOwner = user?._id === comment.user._id;
  const hasLiked = comment.likes.includes(user?._id);
  const hasDisliked = comment.dislikes.includes(user?._id);

  const handleEdit = async () => {
    if (!editContent.trim()) {
      return setError("Comment cannot be empty");
    }

    try {
      await updateComment(comment._id, editContent);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update comment");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(comment._id);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete comment");
      }
    }
  };

  const handleLike = async () => {
    try {
      await likeComment(comment._id);
    } catch (err) {
      console.error("Failed to like comment");
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeComment(comment._id);
    } catch (err) {
      console.error("Failed to dislike comment");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="author">{comment.user.username}</span>
        <span className="date">{formatDate(comment.createdAt)}</span>
      </div>

      {error && <div className="error">{error}</div>}

      {isEditing ? (
        <>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
            maxLength={2000}
          />
          <div className="comment-actions">
            <button onClick={handleEdit}>Save</button>
            <button
              className="danger"
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content);
                setError("");
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="comment-body">{comment.content}</div>
      )}

      <div className="comment-actions">
        <button onClick={() => likeComment(comment._id)}>
          👍 {comment.likes.length}
        </button>

        <button onClick={() => dislikeComment(comment._id)}>
          👎 {comment.dislikes.length}
        </button>

        <button onClick={() => setShowReply(!showReply)}>
          💬 Reply ({comment.replies.length})
        </button>

        {isOwner && !isEditing && (
          <>
            <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
            <button className="danger" onClick={handleDelete}>
              🗑️ Delete
            </button>
          </>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div className="reply-list">
          {comment.replies.map((reply, index) => (
            <div className="comment" key={index}>
              <div className="comment-header">
                <span className="author">{reply.user.username}</span>
                <span className="date">{formatDate(reply.createdAt)}</span>
              </div>
              <div className="comment-body">{reply.content}</div>
            </div>
          ))}
        </div>
      )}

      {showReply && (
        <CommentReply
          commentId={comment._id}
          onClose={() => setShowReply(false)}
        />
      )}
    </div>
  );
};

export default CommentItem;
