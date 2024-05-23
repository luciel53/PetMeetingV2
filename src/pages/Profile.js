import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { NavLink, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import save from "../assets/images/icons/save.png";
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
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditLocation, setIsEditLocation] = useState(false);
  const [isEditBirthdate, setIsEditBirthdate] = useState(false);
  const [isEditBio, setIsEditBio] = useState(false);
  const [isEditWebsite, setIsEditWebsite] = useState(false);
  const [isEditFacebook, setIsEditFacebook] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userBirthdate, setUserBirthdate] = useState("");
  const [userWebsite, setUserWebsite] = useState("");
  const [userFacebook, setUserFacebook] = useState("");
  const [changedMail, setChangedMail] = useState("");
  const [changedLocation, setChangedLocation] = useState("");
  const [changedBirthdate, setChangedBirthdate] = useState("");
  const [changedBio, setChangedBio] = useState("");
  const [changedWebsite, setChangedWebsite] = useState("");
  const [changedFacebook, setChangedFacebook] = useState("");
  const [changedAvatar, setChangedAvatar] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [catsOffers, setCatsOffers] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [connectedUser, setconnectedUser] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

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
      const response = await axios.get(
        `http://localhost:8000/users/${userId}/`
      );
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
      setIsOwner(true);
    } else {
      setconnectedUser(false);
      setIsOwner(false);
    }
  }, [profile, userId]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // define the token access in header of each axios request
        // const accessToken = localStorage.getItem('access_token');
        // const headers = { Authorization: `Bearer ${accessToken}` };
        // get all the profiles
        const response = await axios.get(
          `http://localhost:8000/users/profile/`
        );
        // get the user by id
        const responseUser = await axios.get(
          `http://localhost:8000/users/${id}/`
        );
        // get the offers by id user
        const responseOffersByUser = await axios.get(
          `http://localhost:8000/offers/offers_by_user/${id}/`
        );

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

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await axios.post(
        "http://localhost:8000/token/refresh/",
        { refresh: refreshToken }
      );
      const newAccessToken = response.data.access;
      // Stocker le nouveau jeton d'accès dans le stockage local
      localStorage.setItem("access_token", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token: ", error);
      throw error; // Propager l'erreur pour la gestion ultérieure
    }
  };

  const handleDelete = async (offerId) => {
    let newAccessToken;
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(
        `http://localhost:8000/offers/offers/${offerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclure le jeton JWT dans l'en-tête Authorization
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // update offers list after delete
      setCatsOffers(catsOffers.filter((offer) => offer.id !== offerId));
    } catch (error) {
      // check if error is because of an invalid or expired token
      if (error.response && error.response.status === 401) {
        // refresh token
        try {
          newAccessToken = await refreshToken();
          // retry request with new access token
          const response = await axios.delete(
            `http://localhost:8000/offers/offers/${offerId}`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`, // Inclure le jeton JWT dans l'en-tête Authorization
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          // update offers list after delete
          setCatsOffers(catsOffers.filter((offer) => offer.id !== offerId));
        } catch (refreshError) {
          console.error("Error deleting offers: ", refreshError);
        }
      } else {
        console.error("Error deleting offer: ", error);
      }
    }
  };

  const handleSaveEmail = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          email: changedMail,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Email update response: ", response.data);
      if (response.status === 200) {
        setIsEditEmail(false);
        setUserEmail(changedMail);
      }
    } catch (error) {
      console.error("Error saving email", error);
    }
  };

  const handleSaveBirthdate = async () => {
    try {
      console.log("quelle date?????", changedBirthdate);
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          birthdate: changedBirthdate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditBirthdate(false);
        setUserBirthdate(changedBirthdate);
        setProfile((prevProfile) => ({
          ...prevProfile,
          birthdate: changedBirthdate,
        }));
      }
    } catch (error) {
      console.error("Error saving birthdate", error);
    }
  };

  const handleSaveLocation = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          location: changedLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditLocation(false);
        setUserLocation(changedLocation);
        setProfile((prevProfile) => ({
          ...prevProfile,
          location: changedLocation,
        }));
      }
    } catch (error) {
      console.error("Error saving location", error);
    }
  };

  const handleSaveBio = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          bio: changedBio,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditBio(false);
        setUserBio(changedBio);
        setProfile((prevProfile) => ({
          ...prevProfile,
          bio: changedBio,
        }));
      }
    } catch (error) {
      console.error("Error saving location", error);
    }
  };

  const handleSaveWebsite = async () => {
    try {
      console.log("quel site?????", changedWebsite);
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          external_link: changedWebsite,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditWebsite(false);
        setUserWebsite(changedWebsite);
        setProfile((prevProfile) => ({
          ...prevProfile,
          external_link: changedWebsite,
        }));
      }
    } catch (error) {
      console.error("Error saving website", error);
    }
  };

  const handleSaveFacebook = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          facebook_link: changedFacebook,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditFacebook(false);
        setUserFacebook(changedFacebook);
        setProfile((prevProfile) => ({
          ...prevProfile,
          facebook_link: changedFacebook,
        }));
      }
    } catch (error) {
      console.error("Error saving facebook link", error);
    }
  };

  const handleSaveAvatar = async () => {
    try {
      console.log(changedAvatar);
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          avatar: changedAvatar,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Avatar update response: ", response.data);
      if (response.status === 200) {
        setIsEditAvatar(false);
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar: changedAvatar,
        }));
      }
    } catch (error) {
      console.error("Error saving avatar", error);
    }
  };

  console.log("offers:::", catsOffers);

  return (
    <>
      <NavLink to="/">
        <div className="ml-20 mt-28 mb-4 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </NavLink>
      <div className="container flex flex-col h-auto mt-auto mx-auto ml-72 animate-fade">
        <div className="container flex flex-row mb-6">
          {/* Informations */}
          <div className="container w-[988px] h-auto flex flex-col bg-white rounded-3xl shadow-lg mr-5">
            {/* informations title */}
            <h3 className="mx-auto my-4 text-2xl">
              {connectedUser ? "Mes informations" : "Informations"}
            </h3>
            <div className="flex flex-row w-[988px] mx-24">
              <div className="flex flex-col w-96">
                {/* email */}
                <div className="flex flex-row justify-between mx-10 w-[90%]">
                  <p className="flex flex-row text-lg mt-4 mb-4">
                    <img
                      src={email}
                      className="mr-6"
                      width={28}
                      alt="adresse mail"
                    ></img>
                    {profile ? (
                      <>
                        {isEditEmail ? (
                          <input
                            type="email"
                            value={changedMail}
                            onChange={(e) => setChangedMail(e.target.value)}
                            placeholder="Entrez votre adresse mail"
                            className="w-60 hover:cursor-pointer"
                          />
                        ) : (
                          <span>{userEmail}</span>
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditEmail ? (
                    <img
                      src={change}
                      alt="modifier"
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditEmail(!isEditEmail)}
                    />
                  ) : (
                    isOwner && (
                      <img
                        src={save}
                        alt="sauvegarder"
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveEmail}
                      ></img>
                    )
                  )}
                </div>
                {/* location */}
                <div className="flex flex-row justify-between mx-10 w-[90%]">
                  <p className="flex flex-row text-lg mt-4 mb-4">
                    <img
                      src={location}
                      className="mr-6"
                      width={28}
                      alt="adresse mail"
                    ></img>
                    {profile ? (
                      <>
                        {isEditLocation ? (
                          <input
                            type="text"
                            value={changedLocation}
                            onChange={(e) => setChangedLocation(e.target.value)}
                            placeholder="Entrez votre Localisation"
                            className="w-60"
                          />
                        ) : (
                          <span>{profile.location}</span>
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditLocation ? (
                    <img
                      src={change}
                      alt="modifier"
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditLocation(!isEditLocation)}
                    />
                  ) : (
                    isOwner && (
                      <img
                        src={save}
                        alt="sauvegarder"
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveLocation}
                      ></img>
                    )
                  )}
                </div>
                {/* Birthdate */}
                <div className="flex flex-row justify-between mx-10 w-[90%]">
                  <p className="flex flex-row text-lg mt-4 mb-4">
                    <img
                      src={birthday}
                      className="mr-6"
                      width={28}
                      alt="Date de naissance"
                    ></img>
                    {profile ? (
                      <>
                        {isEditBirthdate ? (
                          <input
                            type="date"
                            value={changedBirthdate}
                            onChange={(e) =>
                              setChangedBirthdate(e.target.value)
                            }
                            placeholder="Votre date de naissance au format YYYY-MM-DD"
                            className="w-60"
                          />
                        ) : (
                          <span>{moment(profile.birthdate).format("DD/MM/YYYY")}</span>
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditBirthdate ? (
                    <img
                      src={change}
                      alt="modifier"
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditBirthdate(!isEditBirthdate)}
                    />
                  ) : (
                    isOwner && (
                      <img
                        src={save}
                        alt="sauvegarder"
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveBirthdate}
                      ></img>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col w-96">
                {/* Bio */}
                <div className="flex flex-row justify-between mx-10 w-[100%]">
                  <p className="flex flex-row text-lg mt-4 mb-4 ">
                    <img
                      src={hello}
                      className="mr-6"
                      width={28}
                      alt="adresse mail"
                    ></img>
                    {profile ? (
                      <>
                        {isEditBio ? (
                          <input
                            type="text"
                            value={changedBio}
                            onChange={(e) => setChangedBio(e.target.value)}
                            placeholder="Entrez votre Présentation"
                            className="w-60"
                          />
                        ) : (
                          <span>{profile.bio}</span>
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditBio ? (
                    <img
                      src={change}
                      alt="modifier"
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditBio(!isEditBio)}
                    />
                  ) : (
                    isOwner && (
                      <img
                        src={save}
                        alt="sauvegarder"
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveBio}
                      ></img>
                    )
                  )}
                </div>
                {/* website */}
                <div className="flex flex-row justify-between mx-10 w-[100%]">
                  <p className="flex flex-row text-lg mt-4 mb-4">
                    <img
                      src={www}
                      className="mr-6"
                      width={28}
                      alt="Site web"
                    ></img>
                    {profile ? (
                      <>
                        {isEditWebsite ? (
                          <input
                            type="url"
                            value={changedWebsite}
                            onChange={(e) => setChangedWebsite(e.target.value)}
                            placeholder="Entrez l'adresse de votre site web"
                            className="w-60"
                          />
                        ) : (
                          profile.external_link && (
                            <a href={profile.external_link}>Voir le site</a>
                          )
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditWebsite ? (
                    <img
                      src={change}
                      alt="modifier"
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditWebsite(!isEditWebsite)}
                    />
                  ) : (
                    isOwner && (
                      <img
                        src={save}
                        alt="sauvegarder"
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveWebsite}
                      ></img>
                    )
                  )}
                </div>
                {/* facebook */}
                <div className="flex flex-row justify-between mx-10 w-[100%]">
                  <p className="flex flex-row text-lg mt-4 mb-8">
                    <img
                      src={facebook}
                      className="mr-6"
                      width={28}
                      alt="Facebook"
                    ></img>
                    {profile ? (
                      <>
                        {isEditFacebook ? (
                          <input
                            type="url"
                            value={changedFacebook}
                            onChange={(e) => setChangedFacebook(e.target.value)}
                            placeholder="Entrez l'adresse de votre profil Facebook"
                            className="w-60"
                          />
                        ) : (
                          profile.facebook_link && (
                            <a href={profile.facebook_link}>Voir le facebook</a>
                          )
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditFacebook ? (
                    <img
                      src={change}
                      alt="modifier"
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditFacebook(!isEditFacebook)}
                    />
                  ) : (
                    isOwner && (
                      <img
                        src={save}
                        alt="sauvegarder"
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveFacebook}
                      ></img>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Avatar */}
          <div className="flex flex-row">
            <>
              <p className="flex flex-row text-lg ml-2 mt-0 mb-4">
                {profile ? (
                  <>
                    {isOwner && isEditAvatar ? (
                      <div className="container flex flex-col w-[350px] h-[303px] bg-white rounded-3xl shadow-lg pb-5">
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
                        <div className="flex flex-row">
                          <input
                            type="file"
                            onChange={(e) =>
                              setChangedAvatar(e.target.files[0])
                            }
                            className="w-60 ml-5 mt-5"
                          />
                          <img
                            src={save}
                            alt="sauvegarder"
                            className="w-6 h-6 ml-10 mt-6"
                            onClick={handleSaveAvatar}
                          ></img>
                        </div>
                      </div>
                    ) : (
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
                        <div className="mb-0 relative">
                          {isOwner && !isEditAvatar ? (
                            <img
                              src={change}
                              className=" w-8 ml-48 -mt-3"
                              alt="modifier l'avatar"
                              onClick={() => setIsEditAvatar(!isEditAvatar)}
                            />
                          ) : (
                            isOwner &&
                            !isEditAvatar(
                              <img
                                src={save}
                                alt="sauvegarder"
                                className="w-6 h-6 ml-24 mt-3.5"
                                onClick={handleSaveAvatar}
                              ></img>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p>Chargement...</p>
                )}
              </p>
            </>
          </div>
        </div>
        {/* Offers list */}
        <div className="container w-[988px] h-96 flex flex-col bg-white rounded-3xl shadow-lg pb-4 mr-5 ">
          <h3 className="mx-auto mt-4 mb-8 text-2xl">
            {connectedUser ? "Mes annonces" : "Annonces"}
          </h3>
          <div className="flex flex-col overflow-y-auto">
          <table className="text-center">
            <thead>
              <tr className="">
                <th>Nom</th>
                <th>Race</th>
                <th>Sexe</th>
                <th>Date</th>
                <th>Photo</th>
                {connectedUser && <th>Supprimer</th>}
              </tr>
            </thead>
            <tr>
              <td colSpan="6" className="h-0.5 border-0 bg-darkgray"></td>
            </tr>

            {catsOffers.offers.map((catOffer) => (
              <React.Fragment key={catOffer.id}>
                <tr className="h-16">
                  <td>
                    <NavLink to={`/Annonces/${catOffer.id}`}>
                      <p className="mt-3"><strong>{catOffer.name}</strong></p>
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/Annonces/${catOffer.id}`}>
                      <p className="mt-3">{catOffer.race}</p>
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/Annonces/${catOffer.id}`}>
                      <p className="mt-3">{catOffer.sex}</p>
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/Annonces/${catOffer.id}`}>
                      <p className="mt-3">{moment(catOffer.date_posted).format("DD/MM/YYYY")}</p>
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={`/Annonces/${catOffer.id}`}>
                      <img
                        src={`http://localhost:8000${catOffer.picture}`}
                        className="w-9 mt-3 mx-auto"
                        alt={catOffer.name}
                      />
                    </NavLink>
                  </td>
                  {connectedUser && (
                    <td>
                      <img
                        src={garbage}
                        className="w-9 mx-auto hover:cursor-pointer"
                        onClick={() => handleDelete(catOffer.id)}
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
      </div>
    </>
  );
}
