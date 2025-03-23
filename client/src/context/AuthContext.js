import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // To decode and check token expiry

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    sessionStorage.getItem("refreshToken")
  );
  const API = 'https://coupon-distribution-backend-seven.vercel.app';

  // Check token validity and refresh if needed on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedAccessToken = sessionStorage.getItem("accessToken");
      const storedRefreshToken = sessionStorage.getItem("refreshToken");

      if (storedAccessToken) {
        try {
          const decoded = jwtDecode(storedAccessToken);
          const isTokenValid = decoded.exp * 1000 > Date.now(); // Check if token is not expired

          if (isTokenValid) {
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setIsAdmin(true);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${storedAccessToken}`;
          } else if (storedRefreshToken) {
            // Access token expired, try refreshing
            const newToken = await refreshAccessToken();
            if (newToken) {
              setIsAdmin(true);
            }
          }
        } catch (err) {
          console.error("Token check failed:", err);
          // If token is invalid or refresh fails, clear session and require login
          logout();
        }
      }
    };

    checkAuthStatus();
  }, []);

  // Refresh token logic
  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(`${API}/api/admin/refresh`, {
        refreshToken,
      });
      setAccessToken(res.data.accessToken);
      sessionStorage.setItem("accessToken", res.data.accessToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;
      return res.data.accessToken;
    } catch (err) {
      console.error("Refresh failed:", err);
      logout();
      return null;
    }
  };

  // Axios interceptor for token refresh on 401
  useEffect(() => {
    const instance = axios.create({
      baseURL: "/",
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.response.data.message === "Token expired"
        ) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return instance(error.config); // Retry original request
          }
        }
        return Promise.reject(error);
      }
    );
  }, [accessToken]);

  const login = async (credentials) => {
    const res = await axios.post(
      `${API}/api/admin/login`,
      credentials
    );
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    setIsAdmin(true);
    sessionStorage.setItem("accessToken", res.data.accessToken);
    sessionStorage.setItem("refreshToken", res.data.refreshToken);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.accessToken}`;
  };

  const logout = async () => {
    try {
      await axios.post(`${API}/api/admin/logout`, {
        refreshToken,
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setAccessToken(null);
    setRefreshToken(null);
    setIsAdmin(false);
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ isAdmin, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
