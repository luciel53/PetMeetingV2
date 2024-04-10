import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import userIcon from "../assets/images/icons/user.svg";
import messagesIcon from "../assets/images/icons/messages.svg";
import logoutIcon from "../assets/images/icons/logout.svg";
import registerIcon from "../assets/images/icons/register.png";
import connectionIcon from "../assets/images/icons/connection.png";
import paw from "../assets/images/icons/paw.png";
import Logout from "../pages/Logout.js";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [connectedIcons, setConnectedIcons] = useState(true);
  const [unconnectedIcons, setUnconnectedIcons] = useState(false);
  const [userId, setUserId] = useState("1");
  const [username, setUsername] = useState("");
  const location = useLocation();
  const { id } = useParams();

  {/* To manage the authentication */}
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
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
    } catch (error) {
      console.log("Error fetching username", error);
    }
  };
  // const ToDecodeToken = async () => {
  //   if (isAuth) {
  //   const token = localStorage.getItem("access_token");
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       setUserId(decodedToken.userId);
  //       console.log(userId);
  //     } catch (error) {
  //       console.error("Error decoding token");
  //     }
  //   }
  // };

  // useEffect(() => {
  //   ToDecodeToken();
  // }, [isAuth, ToDecodeToken])

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      setUnconnectedIcons(false);
    }
  }

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/logout/",
        { refresh_token: localStorage.getItem("refresh_token") },
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );

      console.log("YEAHHHHHHHHHHHHHHH! You're disconnected babe");

      localStorage.clear();
      axios.defaults.headers.common["Authorization"] = null;
      window.location.href = "/login";
    } catch (e) {
      console.log("Logout not working", e);
    }
  };

  return (
    <header className="bg-purple z-50 fixed top-0 w-full shadow-xl">
      <nav
        id="header-nav"
        className="bg-purple mx-auto p-0 flex items-center justify-between"
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex"
          aria-label="Page d'accueil de PetMeeting"
        >
          <img
            src={require("../assets/images/logo.png")}
            className="w-52 md:w-60 lg:w-80 md:mr-4"
            alt="Logo de PetMeeting"
          />
        </NavLink>
        {/* Menu */}
        <ul
          id="toggled-menu"
          className={`w-full absolute flex top-full text-white bg-purple left-0 -z-10 border-b border-gray-200 md:flex flex-col items-center md:static md:z-10 md:w-min md:transform-none md:border-none md:flex-row md:mr-6 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <li className="pt-8 py-4 md:py-0 md:mr-6 hover:animate-wiggle relative">
            <NavLink
              to="/Annonces"
              className="text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative z-20"
              activeClassName="active text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative"
            >
              annonces
            </NavLink>
            {location.pathname === "/Annonces" && (
              <img src={paw} alt="paw" className="z-0 absolute -top-2 left-1" />
            )}
          </li>
          {isAuth && (
            <li className="pt-8 py-4 md:py-0 md:mr-6 hover:animate-wiggle relative">
              <NavLink
                to="/Publier"
                className="text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative z-20"
                activeClassName="active text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative"
              >
                Publier
              </NavLink>
              {location.pathname === "/Publier" && (
                <img
                  src={paw}
                  alt="paw"
                  className="z-0 absolute -top-2 left-1"
                />
              )}
            </li>
          )}
          <li className="pt-8 py-4 md:py-0 md:mr-6 hover:animate-wiggle relative">
            <NavLink
              to="/Membres"
              className="text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative z-20"
              activeClassName="active text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative"
            >
              Membres
            </NavLink>
            {location.pathname === "/Membres" && (
              <img src={paw} alt="paw" className="z-0 absolute -top-2 left-1" />
            )}
          </li>
          <li className="pt-8 py-4 md:py-0 md:mr-6 hover:animate-wiggle relative">
            <NavLink
              to="/Contact"
              className="text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative z-20"
              activeClassName="active text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative"
            >
              Contact
            </NavLink>
            {location.pathname === "/Contact" && (
              <img src={paw} alt="paw" className="z-0 absolute -top-2 left-1" />
            )}
          </li>
        </ul>
        {/* Parallelogram */}
        <div className="flex flex-col bg-gray w-28 md:w-36 lg:w-60 h-12 md:h-14 lg:h-20 skew-x-45 mr-8 md:mr-10 lg:mr-48 px-4 md:px-6 lg:px-12 justify-between items-center">
          <div class="flex flex-row mt-4">
            {isAuth ? (
              <NavLink
                to={`/Profile/${userId.toString()}`}
                className="flex"
                aria-label="Page d'accueil de PetMeeting"
              >
                <img
                  src={userIcon}
                  className="-skew-x-45 w-5 md:w-6 lg:w-8 hover:opacity-70 mr-4"
                  alt="Icône de profil utilisateur"
                />
              </NavLink>
            ) : (
              <NavLink to="/Login" className="flex" aria-label="Login">
                <img
                  src={connectionIcon}
                  className="-skew-x-45 w-9 lg:w-14 mr-2 hover:opacity-70"
                  alt="Connexion"
                />
              </NavLink>
            )}
            {isAuth ? (
              <NavLink to="messagerie" className="flex" aria-label="messagerie">
                <img
                  src={messagesIcon}
                  className="-skew-x-45 w-5 md:w-6 lg:w-8 hover:opacity-70"
                  alt="Icône de profil utilisateur"
                />
              </NavLink>
            ) : (
              <NavLink to="/Register" className="flex" aria-label="Register">
                <img
                  src={registerIcon}
                  className="-skew-x-45 w-10 lg:w-14 hover:opacity-70"
                  alt="Enregistrement"
                />
              </NavLink>
            )}
            {isAuth && (
              <NavLink to="/" className="flex" aria-label="logout">
                <img
                  src={logoutIcon}
                  className="-skew-x-45 w-5 md:w-6 lg:w-8 hover:opacity-70 ml-4"
                  alt="Icône de profil utilisateur"
                  onClick={handleLogout}
                />
              </NavLink>
            )}
          </div>
          {isAuth && (
            <div className="-skew-x-45">
              <p>Hello {username}</p>
            </div>
          )}
        </div>
        {/* Burger button */}
        <button
          aria-label="toggle button"
          aria-expanded={isMenuOpen}
          id="menu-btn"
          className="cursor-pointer mr-2 w-7 md:hidden"
          onClick={toggleMenu}
        >
          <img
            src={require("../assets/images/icons/burger.png")}
            alt="Menu hamburger"
          />
        </button>
      </nav>
    </header>
  );
}
