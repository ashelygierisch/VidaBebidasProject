import axios from 'axios';

const api = axios.create({
  baseURL: '/api/waiver',
});

api.interceptors.request.use(async (config) => {
  const token = process.env.ACCESS_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = process.env.REFRESH_TOKEN;
        const response = await axios.post('https://your-auth-url.com/refresh', {
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refresh_token: refreshToken,
        });

        const newAccessToken = response.data.access_token;
        process.env.ACCESS_TOKEN = newAccessToken;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
