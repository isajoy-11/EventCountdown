import axios from "axios";

const api = axios.create({
    baseURL: "https://event-countdown-api.onrender.com/api/",
});

// Add access token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Refresh access token when it expires
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refresh = localStorage.getItem("refresh");

            if (!refresh) {
                return Promise.reject(error);
            }

            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/token/refresh/",
                    {
                        refresh: refresh,
                    }
                );

                const newAccessToken = response.data.access;

                localStorage.setItem("access", newAccessToken);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;