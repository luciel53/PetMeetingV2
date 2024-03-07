import React from "react";
import Button from "../components/Button";

export default function Contact() {
  return (
    <div className="container flex items-center flex-col justify-center mx-auto md:mx-auto w-[88%] md:w-[55%] lg:w-[25%] p-5 md:p-12 my-28 md:mt-44 bg-white rounded-3xl shadow-xl text-sm md:text-lg">
      <h2 className="text-lg md:text-2xl text-fragole mx-auto mb-6">
        Contactez-nous:
      </h2>
      <label className="ml-4 mb-2">Nom:</label>
      <input
        type="email"
        className="h-8 w-[90%] ml-4 mb-4 pt-1 pl-3 border border-darkgray rounded-lg bg-gray"
      />
      <label className="ml-4 mb-2">Email:</label>
      <input
        type="text"
        className="h-8 w-[90%] ml-4 mb-4 pt-1 pl-3 border border-darkgray rounded-lg bg-gray"
      />
      <label className="ml-4 mb-2">Sujet:</label>
      <input
        type="text"
        className="h-8 w-[90%] ml-4 mb-4 pt-1 pl-3 border border-darkgray rounded-lg bg-gray"
      />
      <label className="ml-4 mb-2">Votre message:</label>
      <input
        type="text"
        className="h-24 w-[90%] ml-4 mb-4 pt-1 pl-3 border border-darkgray rounded-lg bg-gray"
      />
      <Button text="Envoyer" />
    </div>
  );
}
