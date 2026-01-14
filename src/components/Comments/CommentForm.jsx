import { useState } from "react";
import { useComments } from "../../context/CommentContext";

const CommentForm = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addComment } = useComments();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return setError("Comment cannot be empty");
    }

    setLoading(true);
    setError("");

    try {
      await addComment(content);
      setContent("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section">
      <div className="comment-form">
        <h3>Add a Comment</h3>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment here..."
            rows={4}
            maxLength={2000}
            disabled={loading}
          />

          <div className="form-footer">
            <span className="char-count">{content.length}/2000</span>

            <button type="submit" disabled={loading || !content.trim()}>
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
