import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import add from "../assets/images/icons/add.png";
import { useState, useEffect } from "react";

export default function Publier() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loof, setLoof] = useState("");
  const [vaccins, setVaccins] = useState("");
  const initialFormData = {
    name: "",
    race: "",
    sex: "",
    price: "",
    location: "",
    blood: "",
    diseases_tests: "",
    id_num: "",
    eye_color: "",
    fur_color: "",
    age: "",
    qualities: "",
    flaws: "",
    free_descriptive_text: "",
    picture: "",
    picture2: "",
    picture3: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // function handleChange(e) {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // }

  const [blood, setBlood] = useState([]);
  const [races, setRaces] = useState([]);
  const [sex, setSex] = useState([]);
  const [locations, setLocations] = useState([]);
  const [eyeColor, setEyeColor] = useState([]);
  const [showPrice, setShowPrice] = useState(true);

  useEffect(() => {
    fetchSelectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET the data from the backend
  const fetchSelectData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/offers/offers/get_form_data/"
      );
      console.log(response.data);
      setRaces(response.data.races);
      setSex(response.data.sexe);
      setLocations(response.data.locations);
      setBlood(response.data.bloodtype);
      setEyeColor(response.data.eye_color);
    } catch (e) {
      console.error("Erreur lors de la récupération des données");
    }
  };

  function handleFileChange(e) {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      setFormData({ ...formData, [name]: file });
    }
  }

  useEffect(() => {
    // Si loofValue est "Oui", effacer le message d'erreur
    if (loof === "Non" || vaccins === "Non") {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  }, [loof, vaccins]);

  function handleLoofChange(e) {
    setLoof(e.target.value);
  }

  function handleVaccinsChange(e) {
    setVaccins(e.target.value);
  }

  // post an offer
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    //check if LOOF and Vaccins are both set on Yes
    const loofValue = document.querySelector('input[name="loof"]:checked')?.value;
    const vaccinsValue = document.querySelector(
      'input[name="vaccins"]:checked'
    )?.value;

    if (loofValue === "Oui" && vaccinsValue === "Oui") {
      console.log(formData);
      axios
        .post("http://127.0.0.1:8000/offers/offers/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data);
          setFormData(initialFormData);
          console.log(successMessage);
          setSuccessMessage("Votre annonce a bien été postée!");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setShowErrorMessage(true);

      console.error(
        "Ce champs est obligatoire. Nous n'acceptons que les chats LOOF et vaccinés."
      );
    }
  };

  useEffect(() => {
    // if != femelle, shows the price
    setShowPrice(formData.sex !== "Femelle");
  }, [formData.sex]);

  return (
    <>
      <NavLink to="/">
        <div className="ml-5 md:ml-20 mt-16 md:mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </NavLink>
      <div className="container flex flex-col mx-auto animate-fade ">
        <div className="container flex flex-row mx-auto mb-6">
          <img
            src={add}
            className="mt-4 md:mt-0.5 z-2 w-6 h-6 ml-auto"
            alt="ajouter une annonce"
          />
          <h2 className="pl-3 mt-4 md:mt-0 mr-auto text-purple text-xl md:text-2xl">
            Ajoutez une annonce:
          </h2>
        </div>
        {/* Successful message */}
        {successMessage && (
          <div className="border border-green bg-lightgreen mx-96 rounded-lg mt-0 animate-bounce">
            <p className="text-green-600 text-center text-green mt-3 mb-4">
              {successMessage}
            </p>
          </div>
        )}
        {/* form */}
        <div className="flex flex-col md:flex-row items-center place-items-center my-auto mx-auto">
          {/* Description */}

          <form onSubmit={handleSubmit} className="mx-4 pb-4 md:-ml-20">
            <fieldset className="flex flew-row justify-around md:w-[1000px]">
              <div className="flex flex-col md:w-[500px] md:h-[600px] px-10 bg-white rounded-3xl shadow-2xl">
                {/* description title */}
                <h3 className="text-xl md:text-2xl text-center mt-3 mb-6">
                  Description 😽:{" "}
                </h3>
                {/* LOOF */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg">
                  <span>LOOF*:</span>
                  <div className="ml-20">
                    <input
                      type="radio"
                      id="LOOF_yes"
                      name="loof"
                      value="Oui"
                      required
                      onChange={handleLoofChange}
                    />
                    <label htmlFor="LOOF_yes" className="pl-2">
                      Oui
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="LOOF_no"
                      name="loof"
                      value="Non"
                      onChange={handleLoofChange}
                    />
                    <label htmlFor="LOOF_no" className="pl-2 pr-9">
                      Non
                    </label>
                  </div>
                </div>

                {/* Vaccins */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg">
                  <span>Vaccins à jour*:</span>
                  <div className="ml-3">
                    <input
                      type="radio"
                      id="vaccins_yes"
                      name="vaccins"
                      value="Oui"
                      required
                      onChange={handleVaccinsChange}
                    />
                    <label htmlFor="vaccins_yes" className="pl-2">
                      Oui
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="vaccins_no"
                      name="vaccins"
                      value="Non"
                      onChange={handleVaccinsChange}
                    />
                    <label htmlFor="vaccins_no" className="pl-2 pr-9">
                      Non
                    </label>
                  </div>
                </div>
                {/* Error message if loof or vaccins are not yes */}
                {formSubmitted && showErrorMessage && (
                  <div>
                    <div className="text-fragole border border-fragole bg-lightyellow rounded-lg p-2 text-center absolute mt-0 w-96 ml-4 shadow-xl">
                      Ces champs sont obligatoires. Nous n'acceptons que les chats
                      LOOF et à jour de vaccination.<br />
                      (voir la réglementation)
                    </div>
                  </div>
                )}
                {/* Sex */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg">
                  <span className="">Sexe*:</span>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                    className="rounded-lg bg-gray w-52 border border-darkgray ml-2"
                  >
                    <option value="">Choisissez</option>
                    {sex.map((option) => (
                      <option key={option.id} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* name */}
                <div className=" flex flex-row items-center justify-between mb-3 text-sm md:text-lg">
                  <label>Nom*:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                    className="w-52 bg-gray border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                  />
                </div>
                {/* Race */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <span>Race*:</span>
                  <select
                    name="race"
                    value={formData.race}
                    required
                    onChange={handleChange}
                    className="rounded-lg  bg-gray w-52 border border-darkgray ml-2"
                  >
                    <option value="">Choisissez</option>
                    {races.map((option) => (
                      <option key={option.id} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Identification number */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <label>N° d'identification*:</label>
                  <input
                    type="text"
                    name="id_num"
                    value={formData.id_num}
                    required
                    placeholder="LOOF-XXXXXXXX-AAAA-n"
                    onChange={handleChange}
                    className="bg-gray w-52 text-sm border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                  />
                </div>
                {/* Groupe sanguin */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <span>Groupe sanguin:</span>
                  <select
                    name="blood"
                    value={formData.blood}
                    onChange={handleChange}
                    className="rounded-lg bg-gray w-52 border border-darkgray ml-2"
                  >
                    <option value="">Choisissez</option>
                    {blood.map((option) => (
                      <option key={option.id} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Disease tests */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <label>Tests maladies*:</label>
                  <input
                    type="text"
                    name="diseases_tests"
                    required
                    value={formData.diseases_tests}
                    onChange={handleChange}
                    placeholder="Fiv, Felv, Pkdef, ..."
                    className="w-52 bg-gray border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                  />
                </div>
                {/* Age */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <label>Âge* (ans):</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    required
                    onChange={handleChange}
                    className="w-52 bg-gray border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                  />
                </div>

                {/* Robe */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <label>Robe:</label>
                  <input
                    type="text"
                    name="fur_color"
                    value={formData.fur_color}
                    onChange={handleChange}
                    className="w-52 bg-gray border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                  />
                </div>
                {/* Location */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <span>Localisation*:</span>
                  <select
                    name="location"
                    value={formData.location}
                    required
                    onChange={handleChange}
                    className="rounded-lg bg-gray w-52 border border-darkgray ml-2"
                  >
                    <option value="">Choisissez</option>
                    {locations.map((option) => (
                      <option key={option.id} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Price */}
                {showPrice && (
                  <div className="flex flex-row items-center justify-between text-sm md:text-lg ">
                    <label>Prix*:</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      required
                      onChange={handleChange}
                      className="w-52 bg-gray border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                    />
                  </div>
                )}
              </div>
              <div className="w-96">
                {/* Pictures */}
                <div className="md:w-[500px] md:h-[600px] bg-white rounded-3xl shadow-2xl">
                  <div className="flex flex-col justify-center mx-10 mb-3 text-sm md:text-lg">
                    <h3 className="text-2xl text-center mt-3">
                      Infos complémentaires 🔍:
                    </h3>
                    {/* Eye color */}
                    <div className="flex flex-row items-center justify-between mt-6 mb-3 text-sm md:text-lg ">
                      <span>Couleur des yeux:</span>
                      <select
                        name="eye_color"
                        value={formData.eye_color}
                        onChange={handleChange}
                        className="rounded-lg bg-gray w-52 border border-darkgray ml-2"
                      >
                        <option value="">Choisissez</option>
                        {eyeColor.map((option) => (
                          <option key={option.id} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-row justify-between mb-3">
                      <label>Qualités:</label>
                      <textarea
                        type="text"
                        name="qualities"
                        value={formData.qualities}
                        onChange={handleChange}
                        className="w-72 h-20 bg-gray border border-darkgray rounded-lg ml-2 pl-2 px-1"
                      />
                    </div>
                    <div className="flex flex-row justify-between mb-3">
                      <label>Défauts:</label>
                      <textarea
                        type="text"
                        name="flaws"
                        value={formData.flaws}
                        onChange={handleChange}
                        className="w-72 h-20 bg-gray border border-darkgray rounded-lg ml-2 pl-2 px-1"
                      />
                    </div>
                    <div className="flex flex-row justify-between mb-3">
                      <label>Autres:</label>
                      <textarea
                        type="text"
                        name="free_descriptive_text"
                        value={formData.free_descriptive_text}
                        onChange={handleChange}
                        className="w-72 h-20 bg-gray border border-darkgray rounded-lg ml-2 pl-2 px-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center mx-32 mb-3 text-sm md:text-lg">
                    <h3 className="text-2xl text-center mt-3 mb-2">
                      Photos 📸:{" "}
                    </h3>
                    <input
                      type="file"
                      name="picture"
                      onChange={handleFileChange}
                    />
                    <input
                      type="file"
                      name="picture2"
                      onChange={handleFileChange}
                    />
                    <input
                      type="file"
                      name="picture3"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            {/* Button */}
            <div className="ml-28 mb-16">
              <Button text="Publier" className="w-auto" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
