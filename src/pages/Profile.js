import { NavLink, useLocation, useParams } from "react-router-dom";
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
import { useState, useEffect } from "react";
import { act } from "react-dom/test-utils";
import axios from "axios";

export default function Profile() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [catsOffers, setCatsOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const responseUser = await axios.get(`http://localhost:8000/users/${id}/`);
        const response = await axios.get(`http://localhost:8000/users/profile/`);
        const responseOffersByUser = await axios.get(`http://localhost:8000/offers/offers_by_user/${id}/`);

        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;const profiles = (response.data);
        const OffersByUser = (responseOffersByUser.data);
        console.log(OffersByUser);
        setUserEmail(responseUser.data.email);
        setCatsOffers(OffersByUser);
        console.log(profiles);
        console.log(userEmail);
        const selectedProfile = (profiles.filter(profile => profile.user === parseInt(id)));
        if (selectedProfile.length > 0) {
          setProfile(selectedProfile[0]);
        } else {
          setUserNotFound(true);
        }

      } catch (e) {
        console.error('Error fetching profile:', e);
        setUserNotFound(true);
      }
    };
    fetchProfile();
  }, [id, userEmail])

  console.log(profile);
  console.log(userEmail)

  if (userNotFound) {
    return <div>L'utilisateur n'a pas été trouvé.</div>
  }

  if (!profile) {
    return null;
  }

  const popeye = cats.find((cat) => cat.name === "Popeye");

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
              {userEmail}
            </p>
            <p className="flex flex-row text-lg ml-40 mb-4">
              <img
                src={location}
                className="mr-6"
                width={28}
                alt="localisation"
              ></img>
              {profile.location}
            </p>
            <p className="flex flex-row text-lg ml-40 mb-4">
              <img
                src={birthday}
                className="mr-6"
                width={28}
                alt="anniversaire"
              ></img>
              {profile.birthdate}
            </p>
            <p className="flex flex-row text-lg ml-40 mb-4">
              <img
                src={hello}
                className="mr-6"
                width={28}
                alt="présentez-vous"
              ></img>
              {profile.bio}
            </p>
            <p className="flex flex-row text-lg ml-40 mb-4">
              <img src={www} className="mr-6 w-7 h-7" alt="site web"></img>
              <a href={profile.external_link}>Voir le site web</a>
            </p>
            <p className="flex flex-row text-lg ml-40 mb-4">
              <img src={facebook} className="mr-7" alt="Facebook" />
              <a href={profile.facebook_link}>Voir le profil Facebook</a>
            </p>
          </div>
          {/* Avatar */}
          <div className="container flex flex-col w-[250px] h-[263px] bg-white rounded-3xl shadow-lg pb-5">
            <p className="mx-auto mt-3 mb-2 font-semibold text-lg">{profile.username}</p>
            <div className="w-44 h-44 mx-auto">
            <img
              src={profile.avatar}
              className="w-full h-full object-cover rounded-full"
              alt={profile.username}
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
              {catsOffers.offers.map(offer => (
              <tr>
                <td>{offer.name}</td>
                <td>{offer.race}</td>
                <td>{offer.sex}</td>
                <td>date de publi</td>
                <td>
                  <img
                    src={`http://localhost:8000${offer.picture}`}
                    className="w-9 mx-auto"
                    alt={offer.name}
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
              ))}
            </table>

        </div>
      </div>
    </>
  );
}
