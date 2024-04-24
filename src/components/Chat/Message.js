import { React, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Button from "../Button";
import users from "../Users";
import cats from "../Cats";
import addimage from "../../assets/images/icons/addimage.png";

function Message() {
  const suzanne = users.find((user) => user.name === "Suzanne");
  const paul = users.find((user) => user.name === "Paul");
  const popeye = cats.find((cat) => cat.name === "Popeye");

  const baseUrl = "http://127.0.0.1:8000/messaging/";
  const [messages, setMessages] = useState([]);
  const [decodedToken, setDecodedToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // get token
    if (localStorage.getItem("access_token") !== null) {
      console.log("pouette");
      setIsAuth(true);
      const token = localStorage.getItem("access_token");
      try {
        // decode token
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const user_id = decodedToken.user_id;

        // fetch msg using user_id
        axios.get(baseUrl + 'messages/' + user_id +'/').then((response) => {
          console.log(response);
          setMessages(response.data);
        })
      } catch (error) {
        console.log(error);
      }
    }
  }, []);


  return (
    <>
      <NavLink to="/">
        <div className="ml-20 mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </NavLink>
      <div className="flex flex-row mt-4 mx-auto animate-fade">
        {/* Box messages */}
        <aside className="container flex flex-col md:w-[300px] lg:w-[370px] h-[40rem] mr-6 bg-white rounded-3xl shadow-lg pb-5">
          <h2 className="text-center text-md font-semibold mt-2">Messages</h2>
          <div className="mx-auto mt-2">
            <input
              type="search"
              placeholder="Tapez un nom..."
              className="w-60 p-1 border border-darkgray rounded-lg outline-none"
            />
          </div>
          {/* 1 conversation */}
          <div className="flex flex-row py-2 pl-10 mt-6 hover:bg-fairpurple">
            <div>
              {/* Mini offer avatar */}
              <img
                src={popeye.image}
                className="w-12 h-12 object-cover rounded-full mr-6"
                alt={popeye.name}
              />
            </div>
            {/* name + status */}
            <div className="pt-0">
              <div>
                <strong>Popeye</strong>
              </div>
              <div className="flex flex-row text-sm">
                <div className="w-2.5 h-2.5 mt-1 mr-2 rounded-full bg-green"></div>
                <p className="mr-3">
                  <em>Suzanne:</em>
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <em>Pas de soucis! il est...</em>
                </p>
              </div>
            </div>
            {/* Number of no read messages */}
            <div className="h-6 w-6 rounded-full mr-8 bg-fragole text-white mx-auto">
              <p className="text-center mt-0.5">6</p>
            </div>
          </div>
        </aside>
        {/* Chat */}
        <div className="">
          <div className="flex flex-col md:w-[550px] lg:w-[880px] h-[100%] mr-6 p-4 bg-white rounded-3xl shadow-lg">
            <div className="text-center">
              <p>Conversation avec <u><strong>Suzanne</strong></u> à propos de <u><strong>Popeye</strong></u></p>
            </div>
            <hr className="text-darkgray my-2"></hr>
            <div className="text-center w-28 text-verydarkgray mx-auto mb-2">
              <p>Aujourd'hui</p>
            </div>
            {/* Right bubble */}
            <div className="flex flex-row justify-end">
              {/* <div className="w-auto h-2 bg-white"></div> */}
              <div className="flex flex-col max-w-[480px] h-auto ">
                <div className="flex flex-row mt-3 p-3 bg-fairpurple rounded-xl">
                  <p className=" max-w-96">
                    Bonjour! Je cherche un mâle pour ma femelle abyssin, votre
                    mâle est-il toujours disponible? Merci
                  </p>
                  <div className="flex flex-col items-end justify-center ml-3">
                    <img
                      src={paul.image}
                      className="h-12 w-12 ml-3 object-cover rounded-full"
                      alt={paul.name}
                    />
                  </div>
                </div>
                <p className="text-end text-verydarkgray mt-1 mr-2">10:50</p>
              </div>
            </div>
            {/* Left bubble */}
            <div className="flex flex-row max-w-[480px] h-auto mt-3 p-3 bg-gray rounded-xl">
              <img
                src={suzanne.image}
                className="h-12 w-12 object-cover rounded-full"
                alt={suzanne.name}
              />
              <p className="ml-4 max-w-96">
                Pas de soucis! il est toujours dispo!
              </p>
            </div>
            <p className="text-verydarkgray mt-2 ml-2">14:29</p>
          </div>
          {/* Messages input */}
          <div className="flex flex-row w-[750px] h-10 mt-4 mb-auto mr-6 p-4 bg-white items-center rounded-3xl shadow-lg justify-between">
            <textarea
              type="text"
              placeholder="Tapez votre message ici..."
              className="w-[70%] h-6 pl-3  outline-none bg-white resize-none"
            />
            <img
              src={addimage}
              className="w-12 mt-1 hover:animate-wiggle-more"
              alt="Ajouter"
            />
            <div className="-mt-3 -mr-4 hover:opacity-80">
              <Button text="Envoyer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
