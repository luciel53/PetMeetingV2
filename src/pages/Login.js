import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import lock from "../assets/images/icons/lock.png";
import userMini from "../assets/images/icons/user-mini.png";

export default function Login() {
  return (
    <div className="container flex flex-col justify-center mx-auto md:mx-auto w-[88%] md:w-[55%] lg:w-[25%] p-5 md:p-12 md:mt-60 bg-white rounded-3xl shadow-lg text-sm md:text-lg animate-fade">
      <h2 className="text-lg md:text-2xl text-darkdarkgray text-center pb-7">
        Connectez-vous:
      </h2>
      <div className="flex flex-row items-center justify-center">
        <img src={userMini} className="absolute -ml-72 mb-4" alt="lock"></img>
        <input
          type="text"
          placeholder="Nom d'utilisateur*"
          className="h-12 w-[90%] ml-4 mb-4 pt-1 pl-8 border-b border-darkgray focus:outline-none"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <img src={lock} className="absolute -ml-72 mb-4" alt="lock"></img>
        <input
          type="text"
          placeholder="Mot de passe*"
          className="h-12 w-[90%] ml-4 mb-4 pt-1 pl-8 border-b border-darkgray focus:outline-none"
        />
      </div>
      <Button text="Connexion" />
      <hr class="h-px my-8 bg-gray-200 border-0 bg-darkgray"></hr>
      <p className=" flex flex-row mx-auto">
        Pas de compte?{" "}
        <NavLink
          to="/register"
          className="flex"
          aria-label="Créer un nouveau compte"
        >
          <em className="text-fragole pl-2">Enregistrez-vous</em>
        </NavLink>
      </p>
    </div>
  );
}
