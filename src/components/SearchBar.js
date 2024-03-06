import race from "../components/Races";
import département from "../components/Regions";
import search from "../assets/images/icons/search.png";
import { useState } from "react";

export default function SearchBar() {
  const sexe = [
    {
      value: "male",
      label: "Mâle",
    },
    {
      value: "female",
      label: "Femelle",
    },
  ];

  const eyeColor = [
    {
      value: "green",
      label: "Verts",
    },
    {
      value: "blue",
      label: "Bleus",
    },
    {
      value: "gold",
      label: "Or",
    },
    {
      value: "vairons",
      label: "Vairons",
    },
  ];

  const blood = [
    {
      value: "A",
      label: "A",
    },
    {
      value: "B",
      label: "B",
    },
    {
      value: "AB",
      label: "AB",
    },
  ];

  return (
    <div>
      <div className=" flex flex-row bg-white rounded-full md:w-[650px] lg:w-[745px] h-16 border-fragole border mx-auto shadow-lg md:text-xs lg:text-lg">
        <select className="bg-white ml-5 rounded-full outline-none">
          <option value="" className="text-center">
            Sexe
          </option>
          {sexe.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select className="bg-white w-24 rounded-full outline-none">
          <option value="" className="text-center">
            Race
          </option>
          {race.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select className="bg-white pl-2 w-48 rounded-full outline-none">
          <option value="" className="text-center">
            Couleur des yeux
          </option>
          {eyeColor.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        <select className="bg-white ml-5 pr-3 rounded-full outline-none">
          <option value="" className="text-center">
            Groupe sanguin
          </option>
          {blood.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select className="bg-white rounded-full w-24 ml-2 outline-none">
          <option value="" className="text-center">
            Région
          </option>
          {département.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="bg-fragole text-white lg:text-xl lg:w-40 px-4 rounded-full lg:ml-6 shadow-lg hover:opacity-85"
        >
          <img src={search} className="hover:animate-spin" alt="search" />
        </button>
      </div>
      <div>
		
	  </div>
    </div>
  );
}
