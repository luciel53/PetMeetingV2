import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Auth({ setIsAuth, setUsername }) {
	{/* To manage the authentication */}
	const [isAuthLocal, setIsAuthLocal] = useState(false);
	const [userId, setUserId] = useState("");
	const [usernameLocal, setUsernameLocal] = useState("");

	useEffect(() => {
	  if (localStorage.getItem("access_token") !== null) {
		setIsAuth(true);
		setIsAuthLocal(true);
		const token = localStorage.getItem("access_token");
		try {
		  const decodedToken = jwtDecode(token);
		  setUserId(decodedToken.user_id);
		  fetchUsernameByUserId(decodedToken.user_id);
		} catch (error) {
		  console.error("Error decoding token", error);
		}
	  }
	}, []);

	const fetchUsernameByUserId = async () => {
	  try {
		const response = await axios.get(`http://localhost:8000/users/${userId}/`);
		console.log(response.data);
		setUsername(response.data.username);
		setUsernameLocal(response.data.username);
	  } catch (error) {
		console.log("Error fetching username", error);
	  }
	};

	return null;
}
