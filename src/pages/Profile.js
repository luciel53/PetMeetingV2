import { NavLink, useLocation } from "react-router-dom";
import facebook from "../assets/images/icons/facebook.png";

export default function Profile() {
  return (
    <>
      <NavLink to="/">
        <div className="ml-20 mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </NavLink>
      <div className="container flex flex-col h-screen justify-center mt-0 mx-auto ml-72">
        <div className="container flex flex-row mb-6">
          <div className="container w-[988px] h-[395px] flex flex-col bg-white rounded-3xl shadow-lg mr-5">
            <h3 className="mx-auto my-4 text-2xl">Informations:</h3>
            <p className="text-lg ml-10 mt-4">Mail:</p>
            <p className="text-lg ml-10">Localisation:</p>
            <p className="text-lg ml-10">Date de naissance:</p>
            <p className="text-lg ml-10">Présentez-vous:</p>
            <p className="text-lg ml-10">Site internet:</p>
            <img src={facebook} alt="Facebook" className="ml-10" width="20px" />
          </div>
          <div className="container flex flex-col w-[250px] h-[263px] bg-white rounded-3xl shadow-lg">
            <p className="mx-auto mt-3 font-semibold text-lg">Name</p>
            <div className="container w-[183px] h-[183px] bg-gray rounded-full mx-auto my-auto mt-2 shadow-sm"></div>
          </div>
        </div>
        <div className="container w-[988px] h-[395px] flex flex-col bg-white rounded-3xl shadow-lg mr-5">
          <h3 className="mx-auto mt-4 text-2xl">Annonces:</h3>
        </div>
      </div>
    </>
  );
}
