import "./footer.css";
import "./styles.css";
import "tailwindcss/tailwind.css";
import React from "react";
import Navbar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Annonces from "./pages/Annonces";
import Membres from "./pages/Membres";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Publier from "./pages/Publier";
import Contact from "./pages/Contact";
import Error404 from "./pages/Error404";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


document.documentElement.style.fontFamily = "'Mina-Regular', sans-serif";

export default function App() {
  return (
    <Router>
      <div className="App flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Accueil />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Offer" element={<Offer />} />
          <Route path="/Erreur404" element={<Error404 />} />
          <Route path="/Annonces" element={<Annonces />} />
          <Route path="/Annonces/:id" element={<Offer />} />
          <Route path="/Publier" element={<Publier />} />
          <Route path="/Membres" element={<Membres />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/Messagerie" element={<Messages />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
