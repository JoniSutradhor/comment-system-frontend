// import { useState } from 'react';
// import { useComments } from '../../context/CommentContext';

// const CommentReply = ({ commentId, onClose }) => {
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { addReply } = useComments();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!content.trim()) {
//       return setError('Reply cannot be empty');
//     }

//     setLoading(true);
//     setError('');

//     try {
//       await addReply(commentId, content);
//       setContent('');
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add reply');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
    
//       {error && {error}}
      
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Write your reply..."
//         rows="3"
//         maxLength="1000"
//         disabled={loading}
//       />
      
      
        
//           {loading ? 'Posting...' : 'Post Reply'}
        
        
//           Cancel
        
      
    
//   );
// };

// export default CommentReply;

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
    <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your reply..."
          rows="3"
          maxLength="1000"
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        
        <div className="flex justify-end gap-2 mt-3">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post Reply'}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentReply;