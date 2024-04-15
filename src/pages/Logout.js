import { useEffect } from "react";
import axios from "axios";

export default function Logout() {
  useEffect(() => {
    const logout = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/logout/",
          { refresh_token: localStorage.getItem("refresh_token") },
          { headers: { "Content-Type": "application/json" } },
          { withCredentials: true }
        );

        axios.defaults.headers.common["Authorization"] = null;
        localStorage.clear();
        window.location.href = "/login";
      } catch (e) {
        console.log("Logout not working", e);
      }
    };
    logout();
  }, []);

  return <div></div>;
}
