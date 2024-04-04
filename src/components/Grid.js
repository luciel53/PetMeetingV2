import cats from "./Cats";
import male from "../assets/images/icons/male.png";
import female from "../assets/images/icons/female.png";
import { useState } from "react";
import users from "../components/Users";

export default function Grid({ items }) {
  return (
    <div className="grid grid-cols-2 place-content-center md:max-w-max md:mx-auto md:grid-cols-3 lg:grid-cols-4 mt-12 mb-20 animate-fade-down">
      {items.map((item, index) => (
        <div
          key={index}
          className="vignette flex flex-col justify-center items-center text-center bg-white z-0 md:h-96 w-72 mx-auto mr-3 mt-3 pb-2 rounded-3xl shadow-xl hover:opacity-85"
        >
          <p className="text-center text-lg font-semibold mt-3">{item.name}</p>
          <img
            src={item.image}
            className="z-20 h-40 md:h-3/4 w-56 my-3 object-cover mx-auto shadow-sm rounded-3xl"
            alt={item.name}
          />
          {item.race && (
            <p className=" flex flex-row text-center text-lg font-semibold mb-1">
              {item.race}
              {item.sexe}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
