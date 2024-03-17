import { NavLink, useLocation } from "react-router-dom";
import Button from "../components/Button";
import users from "../components/Users";
import cats from "../components/Cats";
import change from "../assets/images/icons/change.png";
import addimage from "../assets/images/icons/addimage.png";
import profileCard from "../assets/images/icons/profileCard.png";

export default function Messages() {
  const suzanne = users.find((user) => user.name === "Suzanne");
  const paul = users.find((user) => user.name === "Paul");
  const popeye = cats.find((cat) => cat.name === "Popeye");
  return (
    <>
      <NavLink to="/">
        <div className="ml-20 mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </NavLink>
      <div className="flex flex-row mt-4 mx-auto animate-fade">
        <div className="mb-20">
          {/* Owner */}
          <div className="container flex flex-col w-[250px] h-[263px] mr-6 bg-white rounded-3xl shadow-lg pb-5">
            <p className="mx-auto mt-3 mb-2 font-semibold text-lg">
              {suzanne.name}
            </p>
            <div className="w-44 h-44 mx-auto">
              <img
                src={suzanne.image}
                className="w-full h-full object-cover rounded-full"
                alt={suzanne.name}
              />
            </div>
            <div className="mb-4 relative">
              <img
                src={profileCard}
                className=" w-8 ml-48 -mt-3"
                alt="modifier le profil"
              />
            </div>
          </div>
          {/* title offer */}
          <div className="container flex flex-col w-[250px] h-[50px] mt-6 mr-6 bg-white rounded-3xl shadow-lg pb-5">
            <h3 className="mx-auto pt-3">L'annonce:</h3>
          </div>
          {/* The offer vignette */}
          <div className="vignette flex flex-col justify-center items-center text-center bg-white z-0 md:h-96 w-[250px] mx-auto mr-6 mt-6 pb-2 rounded-3xl shadow-xl hover:opacity-85">
            <p className="text-center text-lg font-semibold mt-3">
              {popeye.name}
            </p>
            <img
              src={popeye.image}
              className="z-20 h-40 md:h-3/4 w-56 my-3 object-cover mx-auto shadow-sm rounded-3xl"
              alt={popeye.name}
            />

            <p className=" flex flex-row text-center text-lg font-semibold mb-1">
              {popeye.race}
              {popeye.sexe}
            </p>
          </div>
        </div>
        {/* Chat */}
        <div className="mb-28">
          <div className="flex flex-col w-[750px] h-[90%] mr-6 p-4 bg-white rounded-3xl shadow-lg">
            {/* Right bubble */}
            <div className="flex flex-row justify-between">
              <div className="w-auto h-2 bg-white"></div>
              <div className=" w-[320px] h-auto p-3 bg-fairpurple rounded-xl">
                <p>
                  Bonjour! Je cherche un mâle pour ma femelle abyssin, votre
                  mâle est-il toujours disponible? Merci
                </p>
              </div>
            </div>
            {/* Left bubble */}

            <div className=" w-[320px] h-auto mt-3 p-3 bg-gray rounded-xl">
              <p>
                Pas de soucis! il est toujours dispo!
              </p>
            </div>
          </div>
          {/* Messages input */}
          <div className="flex flex-row w-[750px] h-10 mt-4  mb-auto mr-6 p-4 bg-white items-center rounded-3xl shadow-lg justify-between">
            <textarea type="text" placeholder="Tapez votre message ici..." className="w-[70%] h-6 pl-3  outline-none bg-white resize-none" />
            <img src={addimage} className="w-12 mt-1 hover:animate-wiggle-more" alt="Ajouter" />
            <div className="-mt-3 -mr-4 hover:opacity-80">
              <Button text="Envoyer" />
            </div>
          </div>
        </div>
        {/* own profile */}
        <div>
          <div className="container flex flex-col w-[250px] h-[263px] rounded-3xl shadow-lg pb-5 bg-white">
            <p className="mx-auto mt-3 mb-2 font-semibold text-lg">
              {paul.name}
            </p>
            <div className="w-44 h-44 mx-auto">
              <img
                src={paul.image}
                className="w-full h-full object-cover rounded-full"
                alt={paul.name}
              />
            </div>
            <div className="mb-4 relative">
              <img
                src={change}
                className=" w-8 ml-48 -mt-3"
                alt="modifier le profil"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
