import { NavLink, useLocation } from "react-router-dom";
import add from "../assets/images/icons/add.png";
import Button from "../components/Button";
import race from "../components/Races";
import blood from "../components/Blood";
import eyeColor from "../components/EyeColor";
import département from "../components/Regions";

export default function Publier() {
  return (
    <>
      <NavLink to="/">
        <div className="ml-20 mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </NavLink>
      <div className="container flex flex-col mx-auto ">
        <div className="container flex flex-row mx-auto mb-6">
          <img
            src={add}
            className="mt-0.5 z-2 w-6 h-6 ml-auto"
            alt="ajouter une annonce"
          />
          <h2 className="pl-3 mt-0 mr-auto text-purple text-2xl">
            Ajoutez une annonce:
          </h2>
        </div>
        <div className="flex flex-row items-center place-items-center my-auto mx-auto">
          {/* Description */}
          <div className="w-[500px] h-[600px] bg-white rounded-3xl shadow-xl mr-6">
            <h3 className="text-2xl text-center mt-3 mb-6">Description 😽: </h3>
            <form className="mx-10">
              <fieldset>
                {/* LOOF */}
                <div className="flex flex-row items-center justify-between mb-3 text-lg">
                  <span>LOOF*:</span>
                  <div className="ml-20">
                    <input type="checkbox" id="LOOF_yes" name="loof_yes" />
                    <label for="LOOF_yes" className="pl-2">Oui</label>
                  </div>
                  <div>
                    <input type="checkbox" id="LOOF_no" name="loof_no" />
                    <label for="LOOF_yes" className="pl-2 pr-9">Non</label>
                  </div>
                </div>
                {/* Sex */}
                <div className="flex flex-row items-center justify-between mb-3 text-lg">
                  <span className="">Sexe*:</span>
                  <div className="ml-24">
                    <input type="checkbox" id="male" name="male" />
                    <label for="male" className="pl-2">Mâle</label>
                  </div>
                  <div>
                    <input type="checkbox" id="female" name="female" />
                    <label for="female" className="pl-2">Femelle</label>
                  </div>
                </div>
                {/* name */}
                <div className=" flex flex-row items-center justify-between mb-3 text-lg">
                  <label>Nom*:</label>
                  <input type="text" className="w-52 border border-darkgray rounded-lg h-8 ml-2" />
                </div>
                {/* Race */}
                <div className="flex flex-row items-center justify-between mb-3 text-lg ">
                  <span>Race*:</span>
                  <select className="rounded-lg bg-white w-52 border border-darkgray ml-2">
                    <option value="">Choisissez</option>
                    {race.map((option) =>
                    (<option value={option.value}>{option.value}</option>)
                  )}
                  </select>
                </div>
                {/* Identification number */}
                <div className="flex flex-row items-center justify-between mb-3 text-lg ">
                  <label>N° d'identification*:</label>
                  <input type="text" className="w-52 border border-darkgray rounded-lg h-8 ml-2" />
                </div>
                {/* Groupe sanguin */}
                <div className="flex flex-row items-center justify-between mb-3 text-lg ">
                <span>Groupe sanguin:</span>
                  <select className="rounded-lg bg-white w-52 border border-darkgray ml-2">
                    <option value="">Choisissez</option>
                    {blood.map((option) =>
                    <option value={option.value}>{option.value}</option>)}
                  </select>
                </div>
                {/* Disease tests */}
                <div className="flex flex-row items-center justify-between mb-3 text-lg ">
                  <label>Tests maladies*:</label>
                  <input type="text" className="w-52 border border-darkgray rounded-lg h-8 ml-2" />
                </div>
                {/* Age */}
                <div className="flex flex-row items-center justify-between mb-3 text-lg ">
                  <label>Âge*:</label>
                  <input type="text" className="w-52 border border-darkgray rounded-lg h-8 ml-2" />
                </div>
                {/* Eye color */}
                <div className="flex flex-row items-center justify-between mb-3 text-lg ">
                  <span>Couleur des yeux:</span>
                  <select className="rounded-lg bg-white w-52 border border-darkgray ml-2">
                    <option value="">Choisissez</option>
                    {eyeColor.map((option) =>
                    <option value={option.value}>{option.label}</option>)}
                  </select>
                </div>
                {/* Robe */}
                <div className="flex flex-row items-center justify-between mb-3 text-lg ">
                  <label>Robe:</label>
                  <input type="text" className="w-52 border border-darkgray rounded-lg h-8 ml-2" />
                </div>
                {/* Localisation */}
                <div className="flex flex-row items-center justify-between mb-3 text-lg ">
                  <span>Localisation</span>
                  <select className="rounded-lg bg-white w-52 border border-darkgray ml-2">
                    <option value="">Choisissez</option>
                    {département.map((option) =>
                    <option value={option.value}>{option.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-row items-center justify-between text-lg ">
                  <label>Prix*</label>
                  <input type="text" className="w-52 border border-darkgray rounded-lg h-8 ml-2" />
                </div>

              </fieldset>
            </form>
          </div>
          {/* Pictures */}
          <div className="w-[500px] h-[600px] bg-white rounded-3xl shadow-xl">
            <h3 className="text-2xl text-center mt-3">Photos 📸: </h3>
          </div>
        </div>
      </div>
      {/* Button */}
      <Button text="Publier" className="w-auto" />
    </>
  );
}
