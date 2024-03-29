import { NavLink, useLocation } from "react-router-dom";
import facebook from "../assets/images/icons/facebook.png";
import email from "../assets/images/icons/arobase.png";
import location from "../assets/images/icons/location.png";
import birthday from "../assets/images/icons/birthday.png";
import garbage from "../assets/images/icons/garbage.png";
import hello from "../assets/images/icons/hello.png";
import change from "../assets/images/icons/change.png";
import www from "../assets/images/icons/www.png";
import users from "../components/Users";
import cats from "../components/Cats";

export default function Profile() {
  const suzanne = users.find((user) => user.name === "Suzanne");
  const popeye = cats.find((cat) => cat.name === "Popeye");
  console.log(suzanne);

  return (
    <>
      <NavLink to="/">
        <div className="ml-20 mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </NavLink>
      <div className="container flex flex-col h-screen justify-center -mt-10 mx-auto ml-72 animate-fade">
        <div className="container flex flex-row mb-6">
          {/* Informations */}
          <div className="container w-[988px] h-[395px] flex flex-col bg-white rounded-3xl shadow-lg mr-5">
            <h3 className="mx-auto my-4 text-2xl">Mes informations:</h3>
            <p className="flex flex-row text-lg ml-40 mt-4 mb-4">
              <img
                src={email}
                className="mr-6"
                width={28}
                alt="adresse mail"
              ></img>{" "}
              {suzanne.email}
            </p>
            <p className="flex flex-row text-lg ml-40 mb-4">
              <img
                src={location}
                className="mr-6"
                width={28}
                alt="localisation"
              ></img>
              {suzanne.location}
            </p>
            <p className="flex flex-row text-lg ml-40 mb-4">
              <img
                src={birthday}
                className="mr-6"
                width={28}
                alt="anniversaire"
              ></img>
              {suzanne.birthday}
            </p>
            <p className="flex flex-row text-lg ml-40 mb-4">
              <img
                src={hello}
                className="mr-6"
                width={28}
                alt="présentez-vous"
              ></img>
              {suzanne.presentation}
            </p>
            <p className="flex flex-row text-lg ml-40 mb-4">
              <img src={www} className="mr-6 w-7 h-7" alt="site web"></img>
              <a href={suzanne.website}>{suzanne.website}</a>
            </p>
            <p className="flex flex-row text-lg ml-40 mb-4">
              <img src={facebook} className="mr-7" alt="Facebook" />
              <a href={suzanne.facebook}>{suzanne.facebook}</a>
            </p>
          </div>
          {/* Avatar */}
          <div className="container flex flex-col w-[250px] h-[263px] bg-white rounded-3xl shadow-lg pb-5">
            <p className="mx-auto mt-3 mb-2 font-semibold text-lg">{suzanne.name}</p>
            <div className="w-44 h-44 mx-auto">
            <img
              src={suzanne.image}
              className="w-full h-full object-cover rounded-full"
              alt={suzanne.name}
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
        {/* Offers list */}
        <div className="container w-[988px] h-[395px] flex flex-col bg-white rounded-3xl shadow-lg mr-5">
          <h3 className="mx-auto mt-4 mb-8 text-2xl">Mes annonces:</h3>
          <table className="text-center">
            <thead>
              <tr className="">
                <th>Nom</th>
                <th>Race</th>
                <th>Sexe</th>
                <th>Date</th>
                <th>Photo</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tr>
              <td colSpan="6" className="h-0.5 border-0 bg-darkgray"></td>
            </tr>
            <tr>
              <td>{popeye.name}</td>
              <td>{popeye.race}</td>
              <td>{popeye.sexe}</td>
              <td>date de publi</td>
              <td>
                <img
                  src={popeye.image}
                  className="w-9 mx-auto"
                  alt={popeye.name}
                />
              </td>
              <td>
                <img
                  src={garbage}
                  className="w-9 mx-auto"
                  alt="supprimer l'annonce"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
