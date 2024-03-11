import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Grid from "../components/Grid";
import cats from "../components/Cats";

export default function Annonces() {
  return (
    <>
      <NavLink to="/">
        <div className="ml-20 mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </NavLink>
      <div className="container flex flex-col mx-auto text-center mt-8">
        {/* SearchBar */}
        <SearchBar />
        {/* Selection */}
        <div></div>
        {/* Grid */}
        <Grid items={cats} />
      </div>
    </>
  );
}
