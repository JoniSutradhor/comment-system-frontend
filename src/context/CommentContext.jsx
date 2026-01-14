// import { createContext, useState, useEffect, useContext } from "react";
// import { io } from "socket.io-client";
// import api from "../services/api";

// const CommentContext = createContext();

// export const useComments = () => {
//   const context = useContext(CommentContext);
//   if (!context) {
//     throw new Error("useComments must be used within CommentProvider");
//   }
//   return context;
// };

// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// export const CommentProvider = ({ children }) => {
//   const [comments, setComments] = useState([]);
//   const [pagination, setPagination] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const [sortBy, setSortBy] = useState("newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageId = "main";

//   useEffect(() => {
//     const newSocket = io(SOCKET_URL);
//     setSocket(newSocket);

//     newSocket.on("connect", () => {
//       console.log("Connected to socket");
//       newSocket.emit("join-page", pageId);
//     });

//     return () => newSocket.close();
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.on("comment-added", (comment) => {
//         setComments((prev) => [comment, ...prev]);
//       });

//       socket.on("comment-updated", (updatedComment) => {
//         setComments((prev) =>
//           prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
//         );
//       });

//       socket.on("comment-deleted", (commentId) => {
//         setComments((prev) => prev.filter((c) => c._id !== commentId));
//       });

//       socket.on("comment-liked", ({ commentId, likes, dislikes }) => {
//         setComments((prev) =>
//           prev.map((c) => (c._id === commentId ? { ...c, likes, dislikes } : c))
//         );
//       });

//       socket.on("comment-disliked", ({ commentId, likes, dislikes }) => {
//         setComments((prev) =>
//           prev.map((c) => (c._id === commentId ? { ...c, likes, dislikes } : c))
//         );
//       });
//     }
//   }, [socket]);

//   const fetchComments = async (page = 1, sort = sortBy) => {
//     setLoading(true);
//     try {
//       const { data } = await api.get("/comments", {
//         params: { pageId, page, limit: 10, sortBy: sort },
//       });
//       setComments(data.comments);
//       setPagination(data.pagination);
//       setCurrentPage(page);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const addComment = async (content) => {
//     try {
//       const { data } = await api.post("/comments", { content, pageId });
//       socket?.emit("new-comment", { pageId, comment: data });
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const updateComment = async (commentId, content) => {
//     try {
//       const { data } = await api.put(`/comments/${commentId}`, { content });
//       socket?.emit("update-comment", { pageId, comment: data });
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const deleteComment = async (commentId) => {
//     try {
//       await api.delete(`/comments/${commentId}`);
//       socket?.emit("delete-comment", { pageId, commentId });
//     } catch (error) {
//       throw error;
//     }
//   };

//   const likeComment = async (commentId) => {
//     try {
//       const { data } = await api.post(`/comments/${commentId}/like`);
//       socket?.emit("like-comment", {
//         pageId,
//         commentId,
//         likes: data.likes,
//         dislikes: data.dislikes,
//       });
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const dislikeComment = async (commentId) => {
//     try {
//       const { data } = await api.post(`/comments/${commentId}/dislike`);
//       socket?.emit("dislike-comment", {
//         pageId,
//         commentId,
//         likes: data.likes,
//         dislikes: data.dislikes,
//       });
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const addReply = async (commentId, content) => {
//     try {
//       const { data } = await api.post(`/comments/${commentId}/reply`, {
//         content,
//       });
//       socket?.emit("update-comment", { pageId, comment: data });
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const changeSortBy = (newSortBy) => {
//     setSortBy(newSortBy);
//     fetchComments(1, newSortBy);
//   };
//   const value = { children };

//   return (
//     <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
//   );
// };


import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import api from "../services/api";

const CommentContext = createContext();

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComments must be used within CommentProvider");
  }
  return context;
};

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const pageId = "main";

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket");
      newSocket.emit("join-page", pageId);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("comment-added", (comment) => {
        setComments((prev) => [comment, ...prev]);
      });

      socket.on("comment-updated", (updatedComment) => {
        setComments((prev) =>
          prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
        );
      });

      socket.on("comment-deleted", (commentId) => {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
      });

      socket.on("comment-liked", ({ commentId, likes, dislikes }) => {
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? { ...c, likes, dislikes } : c))
        );
      });

      socket.on("comment-disliked", ({ commentId, likes, dislikes }) => {
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? { ...c, likes, dislikes } : c))
        );
      });
    }
  }, [socket]);

  const fetchComments = async (page = 1, sort = sortBy) => {
    setLoading(true);
    try {
      const { data } = await api.get("/comments", {
        params: { pageId, page, limit: 10, sortBy: sort },
      });
      setComments(data.comments);
      setPagination(data.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = async (content) => {
    try {
      const { data } = await api.post("/comments", { content, pageId });
      socket?.emit("new-comment", { pageId, comment: data });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateComment = async (commentId, content) => {
    try {
      const { data } = await api.put(`/comments/${commentId}`, { content });
      socket?.emit("update-comment", { pageId, comment: data });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      socket?.emit("delete-comment", { pageId, commentId });
    } catch (error) {
      throw error;
    }
  };

  const likeComment = async (commentId) => {
    try {
      const { data } = await api.post(`/comments/${commentId}/mostLiked`);
      socket?.emit("like-comment", {
        pageId,
        commentId,
        likes: data.likes,
        dislikes: data.dislikes,
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const dislikeComment = async (commentId) => {
    try {
      const { data } = await api.post(`/comments/${commentId}/dislike`);
      socket?.emit("dislike-comment", {
        pageId,
        commentId,
        likes: data.likes,
        dislikes: data.dislikes,
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const addReply = async (commentId, content) => {
    try {
      const { data } = await api.post(`/comments/${commentId}/reply`, {
        content,
      });
      socket?.emit("update-comment", { pageId, comment: data });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const changeSortBy = (newSortBy) => {
    setSortBy(newSortBy);
    fetchComments(1, newSortBy);
  };

  const value = {
    comments,
    pagination,
    loading,
    sortBy,
    currentPage,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    dislikeComment,
    addReply,
    changeSortBy
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};