import axios from "axios";

import { useAuthStore } from "@/stores/authStore";
import { API_URL } from "@/utils/constants";

import { authService } from "./authService";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("deulaudo_access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { setUser } = useAuthStore.getState();

    const originalRequest = error.config;

    // Verifica se a rota é /refresh-token para evitar looping
    if (
      originalRequest.url.includes("/refresh-token") ||
      originalRequest.url.includes("/auth/signin")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const localRefreshToken = localStorage.getItem("deulaudo_refresh_token");
      if (localRefreshToken) {
        try {
          const { accessToken } = await authService.refreshToken({
            refreshToken: localRefreshToken,
          });

          localStorage.setItem("deulaudo_access_token", accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return api.request(originalRequest);
        } catch (refreshError) {
          setUser(null);
          authService.signOut();

          console.log("Erro ao atualizar o token:", refreshError);
          localStorage.removeItem("deulaudo_access_token");
          localStorage.removeItem("deulaudo_refresh_token");

          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
