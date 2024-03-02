import "./footer.css";
import "./styles.css";
import "tailwindcss/tailwind.css";
import Navbar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Annonces from "./pages/Annonces";
import Footer from "./components/Footer";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


document.documentElement.style.fontFamily = "'Mina-Regular', sans-serif";

export default function App() {
  return (
    <Router>
      <div className="App flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Accueil />} />
          <Route path="/Annonces" element={<Annonces />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
