import { useState } from 'react';
import { useComments } from '../../context/CommentContext';

const CommentReply = ({ commentId, onClose }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addReply } = useComments();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return setError('Reply cannot be empty');
    }

    setLoading(true);
    setError('');

    try {
      await addReply(commentId, content);
      setContent('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add reply');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reply-form">
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your reply..."
          rows={3}
          maxLength={1000}
          disabled={loading}
        />

        <div className="reply-actions">
          <button
            type="submit"
            disabled={loading || !content.trim()}
          >
            {loading ? 'Posting...' : 'Post Reply'}
          </button>

          <button
            type="button"
            className="cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentReply;