import { useEffect } from "react";
import { useComments } from "../../context/CommentContext";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const CommentList = () => {
  const {
    comments,
    pagination,
    loading,
    sortBy,
    currentPage,
    fetchComments,
    changeSortBy,
  } = useComments();

  const handlePageChange = (page) => {
    fetchComments(page);
  };

  return (
    <div className="comment-section">
      <CommentForm />

      <div className="comment-list-header">
        <h2>Comments ({pagination?.total || 0})</h2>

        <div className="comment-sort">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => changeSortBy(e.target.value)}
          >
            <option value="createdAt">Newest</option>
            <option value="mostLiked">Most Liked</option>
            <option value="mostDisliked">Most Disliked</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="comment-loading">
          <span className="spinner" />
          <p>Loading comments...</p>
        </div>
      ) : !comments || comments.length === 0 ? (
        <div className="comment-empty">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <>
          <div className="comment-list">
            {comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="comment-pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {pagination.pages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pages}
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
