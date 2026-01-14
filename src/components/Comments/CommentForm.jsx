// import { useState } from 'react';
// import { useComments } from '../../context/CommentContext';

// const CommentForm = () => {
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { addComment } = useComments();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!content.trim()) {
//       return setError('Comment cannot be empty');
//     }

//     setLoading(true);
//     setError('');

//     try {
//       await addComment(content);
//       setContent('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add comment');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
    
//       Add a Comment
//       {error && {error}}
      
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Write your comment here..."
//         rows="4"
//         maxLength="2000"
//         disabled={loading}
//       />
      
      
//         {content.length}/2000
        
//           {loading ? 'Posting...' : 'Post Comment'}
        
      
    
//   );
// };

// export default CommentForm;

import { useState } from 'react';
import { useComments } from '../../context/CommentContext';

const CommentForm = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addComment } = useComments();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return setError('Comment cannot be empty');
    }

    setLoading(true);
    setError('');

    try {
      await addComment(content);
      setContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Add a Comment
      </h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment here..."
          rows="4"
          maxLength="2000"
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-500">
            {content.length}/2000
          </span>
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;