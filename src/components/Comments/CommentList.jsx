import { useEffect } from 'react';
import { useComments } from '../../context/CommentContext';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

const CommentList = () => {
  const {
    comments,
    pagination,
    loading,
    sortBy,
    currentPage,
    fetchComments,
    changeSortBy
  } = useComments();

  const handlePageChange = (page) => {
    fetchComments(page);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <CommentForm />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Comments ({pagination?.total || 0})
        </h2>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => changeSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="createdAt">Newest</option>
            <option value="mostLiked">Most Liked</option>
            <option value="mostDisliked">Most Disliked</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading comments...</p>
        </div>
      ) : !comments || comments.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg">
            No comments yet. Be the first to comment!
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {comments?.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
              >
                Previous
              </button>
              
              <span className="text-sm text-gray-700 font-medium">
                Page {currentPage} of {pagination.pages}
              </span>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentList;