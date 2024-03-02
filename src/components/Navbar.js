import { useState } from 'react';
import { Link } from 'react-router-dom';
import userIcon from "../assets/images/icons/user.svg";
import messagesIcon from "../assets/images/icons/messages.svg";
import logoutIcon from "../assets/images/icons/logout.svg";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function toggleMenu () {
	  setIsMenuOpen(!isMenuOpen);
	}

	return (
	  <header className="bg-purple z-50 fixed top-0 w-full shadow">
		<nav
		  id="header-nav"
		  className="bg-purple mx-auto p-0 flex items-center justify-between">
		  {/* Logo */}
		  <Link
			to="/"
			className="flex "
			aria-label="Page d'accueil de PetMeeting"
		  >
			<img
			  src={require("../assets/images/logo.png")}
			  className="w-52 md:w-60 lg:w-80 md:mr-4"
			  alt="Logo de PetMeeting"
			/>
		  </Link>
		  {/* Menu */}
		  <ul
			id="toggled-menu"
			className={`w-full absolute flex top-full text-white bg-purple left-0 -z-10 border-b border-gray-200 md:flex flex-col items-center md:static md:z-10 md:w-min md:transform-none md:border-none md:flex-row md:mr-6 ${isMenuOpen ? 'block' : 'hidden'}`}
		  >
			<li className="py-4 md:py-0 md:mr-6">
			  <Link
				to="/Annonces"
				className="text-sm lg:text-xl uppercase font-semibold hover:animate-pulse rounded-lg px-2 w-full hover:bg-white hover:text-purple"
			  >
				annonces
			  </Link>
			</li>
			<li className="py-4 md:py-0 md:mr-6">
			  <a
				href="#publier"
				className="text-sm lg:text-xl uppercase font-semibold w-full hover:text-rose-600"
			  >
				publier
			  </a>
			</li>
			<li className="py-4 md:py-0 md:mr-6">
			  <a
				href="#membres"
				className="text-sm lg:text-xl uppercase font-semibold w-full hover:text-rose-600"
			  >
				membres
			  </a>
			</li>
			<li className="py-4 md:py-0 md:mr-0">
			  <a
				href="#contact"
				className="text-sm lg:text-xl uppercase font-semibold w-full hover:text-rose-600"
			  >
				contact
			  </a>
			</li>
		  </ul>
		  {/* Parallelogram */}
		  <div className="bg-gray w-28 md:w-36 lg:w-60 h-12 md:h-14 lg:h-20 skew-x-45 mr-8 md:mr-10 lg:mr-48 flex flex-row px-4 md:px-6 lg:px-12 justify-between items-center">
			<img src={userIcon} className="-skew-x-45 w-5 md:w-6 lg:w-8" alt="Icône de profil utilisateur" />
			<img src={messagesIcon} className="-skew-x-45 w-5 md:w-6 lg:w-8" alt="Icône de profil utilisateur" />
			<img src={logoutIcon} className="-skew-x-45 w-5 md:w-6 lg:w-8" alt="Icône de profil utilisateur" />
		  </div>
		  {/* Burger button */}
		  <button
			aria-label="toggle button"
			aria-expanded={isMenuOpen}
			id="menu-btn"
			className="cursor-pointer mr-2 w-7 md:hidden"
			onClick={toggleMenu}
		  >
			<img src={require("../assets/images/icons/burger.png")} alt="Menu hamburger" />
		  </button>
		</nav>
	  </header>
	);
  }
