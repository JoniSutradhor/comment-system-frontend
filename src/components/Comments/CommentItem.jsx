// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useComments } from '../../context/CommentContext';
// import CommentReply from './CommentReply';

// const CommentItem = ({ comment }) => {
//   const { user } = useAuth();
//   const { updateComment, deleteComment, likeComment, dislikeComment } = useComments();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editContent, setEditContent] = useState(comment.content);
//   const [showReply, setShowReply] = useState(false);
//   const [error, setError] = useState('');

//   const isOwner = user?._id === comment.user._id;
//   const hasLiked = comment.likes.includes(user?._id);
//   const hasDisliked = comment.dislikes.includes(user?._id);

//   const handleEdit = async () => {
//     if (!editContent.trim()) {
//       return setError('Comment cannot be empty');
//     }

//     try {
//       await updateComment(comment._id, editContent);
//       setIsEditing(false);
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update comment');
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this comment?')) {
//       try {
//         await deleteComment(comment._id);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete comment');
//       }
//     }
//   };

//   const handleLike = async () => {
//     try {
//       await likeComment(comment._id);
//     } catch (err) {
//       console.error('Failed to like comment');
//     }
//   };

//   const handleDislike = async () => {
//     try {
//       await dislikeComment(comment._id);
//     } catch (err) {
//       console.error('Failed to dislike comment');
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
    
      
//         {comment.user.username}
//         {formatDate(comment.createdAt)}
      

//       {error && {error}}

//       {isEditing ? (
        
//           <textarea
//             value={editContent}
//             onChange={(e) => setEditContent(e.target.value)}
//             rows="3"
//             maxLength="2000"
//           />
          
            
//               Save
            
//             <button
//               onClick={() => {
//                 setIsEditing(false);
//                 setEditContent(comment.content);
//                 setError('');
//               }}
//               className="btn-secondary btn-sm"
//             >
//               Cancel
            
          
        
//       ) : (
//         {comment.content}
//       )}

      
        
//           👍 {comment.likes.length}
        
        
        
//           👎 {comment.dislikes.length}
        

//         <button
//           onClick={() => setShowReply(!showReply)}
//           className="btn-text"
//         >
//           💬 Reply ({comment.replies.length})
        

//         {isOwner && !isEditing && (
//           <>
//             <button onClick={() => setIsEditing(true)} className="btn-text">
//               ✏️ Edit
            
            
//               🗑️ Delete
            
//           </>
//         )}
      

//       {comment.replies.length > 0 && (
        
//           Replies:
//           {comment.replies.map((reply, index) => (
            
              
//                 {reply.user.username}
//                 {formatDate(reply.createdAt)}
              
//               {reply.content}
            
//           ))}
        
//       )}

//       {showReply && <CommentReply commentId={comment._id} onClose={() => setShowReply(false)} />}
    
//   );
// };

// export default CommentItem;

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useComments } from '../../context/CommentContext';
import CommentReply from './CommentReply';

const CommentItem = ({ comment }) => {
  const { user } = useAuth();
  const { updateComment, deleteComment, likeComment, dislikeComment } = useComments();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showReply, setShowReply] = useState(false);
  const [error, setError] = useState('');

  const isOwner = user?._id === comment.user._id;
  const hasLiked = comment.likes.includes(user?._id);
  const hasDisliked = comment.dislikes.includes(user?._id);

  const handleEdit = async () => {
    if (!editContent.trim()) {
      return setError('Comment cannot be empty');
    }

    try {
      await updateComment(comment._id, editContent);
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update comment');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(comment._id);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete comment');
      }
    }
  };

  const handleLike = async () => {
    try {
      await likeComment(comment._id);
    } catch (err) {
      console.error('Failed to like comment');
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeComment(comment._id);
    } catch (err) {
      console.error('Failed to dislike comment');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <span className="font-semibold text-gray-900">{comment.user.username}</span>
        <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
          {error}
        </div>
      )}

      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows="3"
            maxLength="2000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content);
                setError('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 mb-4">{comment.content}</p>
      )}

      <div className="flex gap-3 items-center flex-wrap">
        <button
          onClick={handleLike}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            hasLiked
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          👍 {comment.likes.length}
        </button>
        
        <button
          onClick={handleDislike}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            hasDisliked
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          👎 {comment.dislikes.length}
        </button>

        <button
          onClick={() => setShowReply(!showReply)}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          💬 Reply ({comment.replies.length})
        </button>

        {isOwner && !isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              🗑️ Delete
            </button>
          </>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div className="mt-4 ml-6 border-l-2 border-gray-200 pl-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Replies:</p>
          {comment.replies.map((reply, index) => (
            <div key={index} className="bg-gray-50 rounded-md p-4 mb-3">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-900 text-sm">{reply.user.username}</span>
                <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
              </div>
              <p className="text-gray-700 text-sm">{reply.content}</p>
            </div>
          ))}
        </div>
      )}

      {showReply && <CommentReply commentId={comment._id} onClose={() => setShowReply(false)} />}
    </div>
  );
};

export default CommentItem;