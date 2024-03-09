import race from "../components/Races";
import sexe from "../components/Sex";
import eyeColor from "../components/EyeColor";
import blood from "../components/Blood";
import département from "../components/Regions";
import search from "../assets/images/icons/search.png";
import cross from "../assets/images/icons/cross.png";
import { useState } from "react";

export default function SearchBar() {
  const [sex, setSex] = useState("");
  const [Race, setRace] = useState("");
  const [colorEye, setColorEye] = useState("");
  const [groupeSanguin, setGroupeSanguin] = useState("");
  const [localisation, setLocalisation] = useState("");

  function handleRemoveSexCross() {
    setSex("");
  }

  function handleRemoveRaceCross() {
	setRace("");
  }

  function handleRemoveGroupeSanguinCross() {
	setGroupeSanguin("");
  }

  function handleRemoveLocalisationCross() {
	setLocalisation("");
  }

  function handleRemoveColorEyeCross() {
	setColorEye("");
  }

  return (
    <div>
      <div className=" flex flex-row bg-white rounded-full md:w-[650px] lg:w-[719px] h-16 border-fragole border mx-auto shadow-lg md:text-xs lg:text-lg">
        <select className="bg-white rounded-full outline-none pl-4 hover:opacity-50 cursor-pointer" onChange={(e) => setSex(e.target.value)}>
          <option value="" className="text-center">
            Sexe
          </option>
          {sexe.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select className="bg-white w-20 pr-2 pl-3 rounded-full outline-none hover:opacity-50 cursor-pointer" onChange={(e) => setRace(e.target.value)}>
          <option value="" className="text-center">
            Race
          </option>
          {race.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select className="bg-white pl-3 pr-2 w-48 rounded-full outline-none hover:opacity-50 cursor-pointer" onChange={(e) => setColorEye(e.target.value)}>
          <option value="" className="text-center">
            Couleur des yeux
          </option>
          {eyeColor.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        <select className="bg-white ml-3 pr-2 rounded-full outline-none hover:opacity-50 cursor-pointer" onChange={(e)  => setGroupeSanguin(e.target.value)}>
          <option value="" className="text-center">
            Groupe sanguin
          </option>
          {blood.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select className="bg-white rounded-full w-24 pl-2 outline-none hover:opacity-50 cursor-pointer" onChange={(e) => setLocalisation(e.target.value)}>
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
		<ul className="flex flex-row w-auto mt-4 justify-center">
			{sex && <li className="container flex flex-row bg-white border-fragole border h-10 w-auto text-center p-2 mr-3 rounded-lg">
				<p className="flex flex-row">{sex}
				<button onClick={handleRemoveSexCross}><img src={cross} className="w-3.5 h-3.5 ml-3" alt="delete" /></button></p>
			</li>}
			{Race && <li className="container flex flex-row bg-white border-fragole border h-10 w-auto text-center p-2 mr-3 rounded-lg">
				<p className="flex flex-row">{Race}
				<button onClick={handleRemoveRaceCross}><img src={cross} className="w-3.5 h-3.5 ml-3" alt="delete" /></button></p>
			</li>}
			{colorEye && <li className="container flex flex-row bg-white border-fragole border h-10 w-auto text-center p-2 mr-3 rounded-lg">
				<p className="flex flex-row">{colorEye}
				<button onClick={handleRemoveColorEyeCross}><img src={cross} className="w-3.5 h-3.5 ml-3" alt="delete" /></button></p>
			</li>}
			{groupeSanguin && <li className="container flex flex-row bg-white border-fragole border h-10 w-auto text-center p-2 mr-3 rounded-lg">
				<p className="flex flex-row">{groupeSanguin}
				<button onClick={handleRemoveGroupeSanguinCross}><img src={cross} className="w-3.5 h-3.5 ml-3" alt="delete" /></button></p>
			</li>}
			{localisation && <li className="container flex flex-row bg-white border-fragole border h-10 w-auto text-center p-2 mr-3 rounded-lg">
				<p className="flex flex-row">{localisation}
				<button onClick={handleRemoveLocalisationCross}><img src={cross} className="w-3.5 h-3.5 ml-3" alt="delete" /></button></p>
			</li>}
		</ul>
	  </div>
    </div>
  );
}
