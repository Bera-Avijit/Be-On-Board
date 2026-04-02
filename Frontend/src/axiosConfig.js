import axios from 'axios';

// 1. Request Interceptor: Automatically attach the Access Token to every API call
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url.includes('/api/auth/')) { 
      // Do not attach token to auth endpoints like login/register unnecessarily
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: The Hidden Manager that catches 401s and Refreshes the Token
axios.interceptors.response.use(
  (response) => {
    return response; // If the call succeeds, just pass it through!
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 Unauthorized and we haven't already retried this exact request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried to prevent infinite loops

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Send the Passport (Refresh Token) to get a new Keycard (Access Token)
        const response = await axios.post('http://localhost:8080/api/auth/refresh', {
          refreshToken: refreshToken
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        // Save the new tokens safely in localStorage
        if (newAccessToken) localStorage.setItem('token', newAccessToken);
        if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

        // Update the original failed request with the new fresh token and retry it!
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return axios(originalRequest);

      } catch (refreshError) {
        // If the refresh token is ALSO expired or invalid, force logout!
        console.error('Session expired. Logging out.');
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
