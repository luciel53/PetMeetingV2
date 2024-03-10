import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  return (
    <div className="container flex flex-col justify-center mx-auto md:mx-auto w-[88%] md:w-[55%] lg:w-[30%] p-5 md:p-12 md:mt-60 lg:mt-52 bg-white rounded-3xl shadow-2xl text-sm md:text-lg animate-fade">
      <h2 className="text-lg md:text-2xl text-darkdarkgray text-center pb-7">
        Contactez-nous:
      </h2>
      <div className="flex flex-row items-center justify-center">
        <input
          type="text"
          placeholder="Nom*"
          className="h-12 w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <input
          type="text"
          placeholder="Email*"
          className="h-12 w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <input
          type="text"
          placeholder="Sujet*"
          className="h-12 w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <textarea
          type="text"
          placeholder="Message*"
          className="h-28 w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
        />
      </div>
      <Button text="Envoyer" />
    </div>
  );
}
