// import { createContext, useState, useEffect, useContext } from 'react';
// import api from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const { data } = await api.get('/auth/me');
//         setUser(data);
//       } catch (error) {
//         localStorage.removeItem('token');
//       }
//     }
//     setLoading(false);
//   };

//   const login = async (email, password) => {
//     const { data } = await api.post('/auth/login', { email, password });
//     localStorage.setItem('token', data.token);
//     setUser(data);
//     return data;
//   };

//   const register = async (username, email, password) => {
//     const { data } = await api.post('/auth/register', { username, email, password });
//     localStorage.setItem('token', data.token);
//     setUser(data);
//     return data;
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   const value = {
//     comments,
//     pagination,
//     loading,
//     sortBy,
//     currentPage,
//     fetchComments,
//     addComment,
//     updateComment,
//     deleteComment,
//     likeComment,
//     dislikeComment,
//     addReply,
//     changeSortBy
//   };

//   return {children};
// };

// import { createContext, useState, useEffect, useContext } from 'react';
// import api from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     checkAuth();
//   }, [isAuthenticated, setIsAuthenticated]);

//   const checkAuth = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const { data } = await api.get('/auth/me');
//         setUser(data);
//         setIsAuthenticated(true);
//       } catch (error) {
//         localStorage.removeItem('token');
//         setIsAuthenticated(false);
//       }
//     }
//     setLoading(false);
//   };

//   const login = async (email, password) => {
//     const { data } = await api.post('/auth/login', { email, password });
//     localStorage.setItem('token', data.token);
//     setUser(data);
//     return data;
//   };

//   const register = async (username, email, password) => {
//     const { data } = await api.post('/auth/register', { username, email, password });
//     localStorage.setItem('token', data.token);
//     setUser(data);
//     return data;
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     checkAuth,
//     isAuthenticated
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get("/auth/me");

      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", data.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setUser(data.user ?? data);
    setIsAuthenticated(true);

    return data;
  };

  const register = async (username, email, password) => {
    const { data } = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    setUser(data.user ?? data);
    setIsAuthenticated(true);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
