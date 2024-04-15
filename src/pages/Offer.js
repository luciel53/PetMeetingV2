import { NavLink, useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import profileMsg from "../assets/images/icons/profileMsg.png";
import profileCard from "../assets/images/icons/profileCard.png";
import minicat from "../assets/images/icons/minicat.png";
import warning from "../assets/images/icons/warning.png";
import male from "../assets/images/icons/male.png";
import female from "../assets/images/icons/female.png";
import abyssin from "../assets/images/grid-carousel/abyssin.png";
import noPic from "../assets/images/nopicture.png";

export default function Offer() {
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [avatar, setAvatar] = useState(null);
  // useParams extracts the params of the url
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchCatOffer = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/offers/offers/get_all_offers/"
        );
        const offers = response.data.offers;
        const selected = offers.find((offer) => offer.id === parseInt(id));
        setSelectedOffer(selected);

        const ownerResponse = await axios.get(
          `http://127.0.0.1:8000/users/profile/${selected.user_id}`
        );
        const profile = ownerResponse.data;
        setAvatar(profile.avatar);
      } catch (e) {
        console.error("Error fetching cats offers", e);
      }
    };
    fetchCatOffer();
  }, [id, avatar]);

  if (!selectedOffer) {
    return null;
  }

  console.log(selectedOffer);

  return (
    <>
      <NavLink to="/Annonces">
        <div className="ml-20 mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour aux annonces
        </div>
      </NavLink>
      <div className="mx-auto">
        <div className="container flex flex-row col-end-4 mt-6 mb-32">
          {/* Owner */}
          <div className="container flex flex-col w-[250px] h-[263px] mr-6 bg-white rounded-3xl shadow-lg animate-fade-right">
            <NavLink to={`/profile/${selectedOffer.user_id}`}>
              <p className="mx-auto mt-3 font-semibold text-lg text-center">
                {selectedOffer.user}
              </p>
            </NavLink>
            <div className="container w-[175px] h-[183px] bg-gray rounded-full mx-auto my-auto mt-2 shadow-sm z-0 overflow-hidden">
              <img
                src={avatar}
                className="max-w-[175px] m-h-[183] rounded-full"
                alt="Propriétaire"
              />
            </div>
            <div className="flex flex-row">
              <div className="ml-6">
                <NavLink to={`/profile/${selectedOffer.user_id}`}>
                  <img src={profileCard} className="h-8" alt="profil" />
                </NavLink>
              </div>
              <div className="ml-36 z-20 pb-5">
                <img
                  src={profileMsg}
                  className="mt-1 h-6.5"
                  alt="envoyer un message"
                />
              </div>
            </div>
          </div>
          {/* Offer Details */}
          <div className="flex flex-col animate-fade-down">
            {/* Title (name), date and price */}
            <div className="container flex flex-row flex-wrap bg-white w-[500px] pl-6 pt-4 h-auto mr-6 mx-auto rounded-3xl shadow-lg">
              {/* Cat icon + title */}
              <div className="flex flex-row w-1/2 mb-5">
                <img
                  src={minicat}
                  className="w-8 h-8 pb-1"
                  alt="icone de chat"
                />
                <h3 className="text-2xl pl-2 font-semibold">
                  {selectedOffer.name}
                </h3>
              </div>
              <div className="flex flex-col w-1/2 pl-12 pt-1">
                <div className="flex flex-row items-center">
                  <small className="">01/02/2024 20:58</small>
                  <NavLink to={`/contact?&email=&topic=Signalement d'une annonce&message=Bonjour, je souhaite signaler l'annonce n°${selectedOffer.id} - ${selectedOffer.name}, car `}>
                  <img
                    src={warning}
                    className="mr-4"
                    alt="signaler l'annonce"
                  />
                  </NavLink>
                </div>
                {/* Price */}

                <strong className="text-2xl">
                  {selectedOffer.sex === "Mâle"
                    ? selectedOffer.price + " €"
                    : null}
                </strong>
              </div>

              {/* Details */}
              <div className="flex flex-row pb-5">
                <div className="flex flex-col">
                  <div>
                    <table className="text-lg ml-5 leading-8">
                      <tr>
                        <td className="text-purple">Sexe:</td>
                        <td className="pl-7">
                          {selectedOffer.sex === "Mâle" ? (
                            <img src={male} alt="mâle" />
                          ) : (
                            <img src={female} alt="femelle" />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-purple">LOOF:</td>
                        <td className="pl-8">Oui</td>
                      </tr>
                      <tr>
                        <td className="text-purple">Localisation:</td>
                        <td className="pl-8">{selectedOffer.location}</td>
                      </tr>
                      <tr>
                        <td className="text-purple">Groupe sanguin:</td>
                        <td className="pl-8">{selectedOffer.blood}</td>
                      </tr>
                      <tr>
                        <td className="text-purple">Tests maladies:</td>
                        <td className="pl-8">{selectedOffer.diseases_tests}</td>
                      </tr>
                      <tr>
                        <td className="text-purple">Vaccins à jour:</td>
                        <td className="pl-8">Oui</td>
                      </tr>
                      <tr>
                        <td className="text-purple">N° d’identification:</td>
                        <td className="pl-8">{selectedOffer.id_num}</td>
                      </tr>
                      <tr>
                        <td className="text-purple">Couleur des yeux:</td>
                        <td className="pl-8">{selectedOffer.eye_color}</td>
                      </tr>
                      <tr>
                        <td className="text-purple">Robe:</td>
                        <td className="pl-8">{selectedOffer.fur_color}</td>
                      </tr>
                      <tr>
                        <td className="text-purple">Age:</td>
                        <td className="pl-8">{selectedOffer.age} an(s)</td>
                      </tr>
                      <tr>
                        <td className="text-purple">Qualités:</td>
                        <td
                          className="pl-8 pr-5"
                          style={{ wordBreak: "break-word" }}
                        >
                          {selectedOffer.qualities}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-purple">Défauts:</td>
                        <td
                          className="pl-8 pr-5"
                          style={{ wordBreak: "break-word" }}
                        >
                          {selectedOffer.flaws}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-purple">Autres:</td>
                        <td
                          className="pl-8 pr-5"
                          style={{ wordBreak: "break-word" }}
                        >
                          {selectedOffer.free_descriptive_text}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pictures */}
          <div className="container bg-white w-[500px]  mx-auto rounded-3xl shadow-lg animate-fade-left">
            {/* Big Picture */}
            <div className="h-auto">
              <img
                src={abyssin}
                className="mt-24 mb-5 mx-auto max-w-72 max-h-96 shadow-lg"
                alt="1"
              />
            </div>
            {/* Mini pictures */}
            <div className="h-auto mt-12 mb-10">
              <div className="flex flex-row justify-center">
                <img
                  src={`http://127.0.0.1:8000${selectedOffer.picture}`}
                  className="max-w-24 max-h-24 mr-4 rounded-lg shadow-lg"
                  alt="image1"
                />
                {selectedOffer.picture2 ? (
                  <img
                    src={`http://127.0.0.1:8000${selectedOffer.picture2}`}
                    className="max-w-24 max-h-24 mr-4 rounded-lg shadow-lg"
                    alt="image2"
                  />
                ) : (
                  <img
                    src={noPic}
                    alt="Vide"
                    className="max-w-24 max-h-24 mr-4 rounded-lg shadow-lg"
                  />
                )}
                {selectedOffer.picture3 ? (
                  <img
                    src={`http://127.0.0.1:8000${selectedOffer.picture3}`}
                    className="max-w-24 max-h-24 mr-4 rounded-lg shadow-lg"
                    alt="image3"
                  />
                ) : (
                  <img
                    src={noPic}
                    alt="Vide"
                    className="max-w-24 max-h-24 mr-4 rounded-lg shadow-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
