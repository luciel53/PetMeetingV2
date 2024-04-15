import axios from "axios";

let refresh = false;

axios.interceptors.response.use(
  resp => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        console.log("No refresh token available");
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/token/refresh/",
          { refresh: refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${refreshToken}`,
            }
          }
        );
        if (response.status === 200) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data["access"]}`;
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);

          // Retry the original request
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error("Error refreshing token: ", refreshError);
        return Promise.reject(error);
      } finally {
        refresh = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
