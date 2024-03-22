import axios from "axios";

let refresh = false;

// check the response
axios.interceptors.response.use(
  resp => resp, async (error) => {
    // (401 when token expires)
    if (error.response.status === 401 && !refresh) {

        refresh = true;
        console.log(localStorage.getItem('refresh_token'))
        const response = await axios.post(
          "http://localhost:8000/token/refresh/",
          { refresh: localStorage.getItem('refresh_token') },
          { headers: { "Content-Type": "application/json" } },
          { withCredentials: true }
        );
        if (response.status === 200) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data["access"]}`;
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);

          return axios(error.config);
        }
      }
      refresh = false;
      return error;
    }
);

export default axios;
