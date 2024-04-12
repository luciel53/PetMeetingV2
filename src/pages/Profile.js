import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import facebook from "../assets/images/icons/facebook.png";
import email from "../assets/images/icons/arobase.png";
import location from "../assets/images/icons/location.png";
import birthday from "../assets/images/icons/birthday.png";
import garbage from "../assets/images/icons/garbage.png";
import hello from "../assets/images/icons/hello.png";
import change from "../assets/images/icons/change.png";
import www from "../assets/images/icons/www.png";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [catsOffers, setCatsOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [connectedUser, setconnectedUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
      const token = localStorage.getItem("access_token");
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user_id);
        fetchUsernameByUserId(decodedToken.user_id);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const fetchUsernameByUserId = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/${userId}/`);
      console.log(response.data);
      setUsername(response.data.username);
    } catch (error) {
      console.log("Error fetching username", error);
    }
  };

  // to show the garbage icon if user is logged and owner
  useEffect(() => {
    if (profile && userId && profile.user === parseInt(userId)) {
      setconnectedUser(true);
    } else {
      setconnectedUser(false);
    }
  }, [profile, userId]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // define the token access in header of each axios request
        // const accessToken = localStorage.getItem('access_token');
        // const headers = { Authorization: `Bearer ${accessToken}` };
        // get all the profiles
        const response = await axios.get(`http://localhost:8000/users/profile/`);
        // get the user by id
        const responseUser = await axios.get(`http://localhost:8000/users/${id}/`);
        // get the offers by id user
        const responseOffersByUser = await axios.get(`http://localhost:8000/offers/offers_by_user/${id}/`);

        // //authorize access with token
        // axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;

        // store the profiles data in a variable
        const profiles = response.data;
        // store the offers data of the user in a variable
        const OffersByUser = responseOffersByUser.data;
        console.log(responseUser.data);
        console.log(OffersByUser);
        // set the email address of the user
        setUserEmail(responseUser.data.email);
        // set the offers by user
        setCatsOffers(OffersByUser);
        console.log(profiles);
        console.log(userEmail);
        // filter the users by id
        const selectedProfile = profiles.filter(
          (profile) => profile.user === parseInt(id)
        );

        if (selectedProfile.length > 0) {
          setProfile(selectedProfile[0]);
        } else {
          setUserNotFound(true);
        }
      } catch (e) {
        console.error("Error fetching profile:", e);
        setUserNotFound(true);
      }
    };
    fetchProfile();
  }, [id, userEmail]);

  if (userNotFound) {
    return <div>L'utilisateur n'a pas été trouvé.</div>;
  }

  if (!profile) {
    return null;
  }

  console.log("owner's id: ", profile);
  console.log("userId ::::::", userId);


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
            <h3 className="mx-auto my-4 text-2xl">
              {connectedUser ? ('Mes informations') : ('Informations')}
              </h3>
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
            <p className="mx-auto mt-3 mb-2 font-semibold text-lg">
              {profile.username}
            </p>
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
          <h3 className="mx-auto mt-4 mb-8 text-2xl">
            {connectedUser ? ('Mes annonces') : ('Annonces')}</h3>
          <table className="text-center">
            <thead>
              <tr className="">
                <th>Nom</th>
                <th>Race</th>
                <th>Sexe</th>
                <th>Date</th>
                <th>Photo</th>
                {connectedUser && (
                <th>Supprimer</th>
                )}
              </tr>
            </thead>
            <tr>
              <td colSpan="6" className="h-0.5 border-0 bg-darkgray"></td>
            </tr>

            {catsOffers.offers.map((catOffer) => (
              <React.Fragment key={catOffer.id}>
                <tr>
                  <td>
                    <NavLink to={`/Annonces/${catOffer.id}`}>
                      {catOffer.name}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/Annonces/${catOffer.id}`}>
                      {catOffer.race}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/Annonces/${catOffer.id}`}>
                      {catOffer.sex}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/Annonces/${catOffer.id}`}>
                      {catOffer.name}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/Annonces/${catOffer.id}`}>
                      <img
                        src={`http://localhost:8000${catOffer.picture}`}
                        className="w-9 mx-auto"
                        alt={catOffer.name}
                      />
                    </NavLink>
                  </td>
                  {connectedUser && (
                    <td>
                      <img
                        src={garbage}
                        className="w-9 mx-auto"
                        alt="supprimer l'annonce"
                      />
                    </td>
                  )}
                </tr>
              </React.Fragment>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
