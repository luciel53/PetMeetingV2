import { React, useState, useEffect } from "react";
import { NavLink, useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import Button from "../Button";
import users from "../Users";
import cats from "../Cats";
import addimage from "../../assets/images/icons/addimage.png";

function MessageDetail() {
  const suzanne = users.find((user) => user.name === "Suzanne");
  const paul = users.find((user) => user.name === "Paul");
  const popeye = cats.find((cat) => cat.name === "Popeye");

  const baseUrl = "http://127.0.0.1:8000/messaging/";
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const other_user_id = useParams();
  const { sender_id, receiver_id, cat_offer } = useParams();
  const [displayedConversations, setDisplayedConversations] = useState(
    new Set()
  );
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
    const [websocketMessages, setWebsocketMessages] = useState([]);

  // To display all the conversations
  useEffect(() => {
    // get token
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
      const token = localStorage.getItem("access_token");
      try {
        // decode token
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.user_id;
        setUserId(user_id);

        // fetch messages using user_id
        axios.get(baseUrl + "messages/" + user_id + "/").then((response) => {
          setMessages(response.data);
          console.log(messages);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  // To display messages in the chat window
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
      const token = localStorage.getItem("access_token");
      try {
        // decode token
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.user_id;
        setUserId(user_id);

        // fetch msg using user_id
        if (isAuth && sender_id && receiver_id) {
          axios
            .get(
              baseUrl +
                "get-messages/" +
                user_id +
                "/" +
                receiver_id +
                "/" +
                cat_offer
            )
            .then((response) => {
              setMessage(response.data);
              console.log("QUEL MESSAGE:", message);
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [isAuth, sender_id, receiver_id, cat_offer]);

  const filteredMessages = messages.filter((message) => {
    const conversationKey = `${message.receiver}-${message.sender}-${message.cat_offer}`;
    console.log("conversations: ", conversationKey);
    return !displayedConversations.has(conversationKey);
  });


  const offer = message.find(
    (message) => message.sender === userId || message.receiver === userId
  );

  // To manage the websocket connection
  useEffect(() => {
    // const chatRoom = `${sender_id}-${receiver_id}-${cat_offer}`;
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/messaging/`);

    socket.addEventListener("open", () => {
      console.log(" WEBSOCKET CONNECTED");
      setIsWebSocketConnected(true);
    });

    socket.addEventListener("error", (event) => {
      console.error(" WEBSOCKET ERROR", event);
      setIsWebSocketConnected(false);
    });

    socket.addEventListener("message", (event) => {
      // update the message state by adding the new message
      const newMessage = JSON.parse(event.data);
      console.log("EVENTDATA", event.data);
      setWebsocketMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("Nouveau message reçu :", newMessage);
    });

    //Clean up websocket connection
    return () => {
      if (socket.readyState === 1) {
        socket.close();
        console.log("WEBSOCKET DISCONNECTED");
        setIsWebSocketConnected(false);
      }
    };
  }, [messages]);

  // Fusion des messages HTTP et WebSocket
  // useEffect(() => {
  //   // Combine les messages HTTP et WebSocket
  //   const updatedMessages = [...messages, ...websocketMessages];
  // }, [messages, websocketMessages]);

  console.log("WEBSOK", websocketMessages);

  return (
    <div className="flex flex-row mt-40 mx-auto animate-fade">
      {/* Box messages */}
      <aside className="container flex flex-col md:w-[300px] lg:w-[370px] h-[40rem] mr-6 bg-white rounded-3xl shadow-lg pb-5 overflow-scroll">
        <h2 className="text-center text-md font-semibold mt-2">Messages</h2>
        <div className="mx-auto mt-2">
          <input
            type="search"
            placeholder="Tapez un nom..."
            className="w-60 p-1 border border-darkgray rounded-lg outline-none"
          />
        </div>
        {/* 1 conversation */}
        {filteredMessages.map((msg, index) => (
          <NavLink
            key={userId + msg.id}
            to={
              "/messagerie/" +
              (userId === msg.sender ? msg.sender : msg.receiver) +
              "/" +
              (userId === msg.sender ? msg.receiver : msg.sender) +
              "/" +
              msg.cat_offer
            }
          >
            <div className="flex flex-row py-2 pl-10 mt-6 hover:bg-fairpurple">
              <div>
                {/* Mini offer avatar */}
                <img
                  src={`http://127.0.0.1:8000${msg.cat_offer_picture}`}
                  className="w-12 h-12 object-cover rounded-full mr-6"
                  alt={msg.cat_offer_name}
                />
              </div>
              {/* name + status */}
              <div className="pt-0">
                <div>
                  <strong>{msg.cat_offer_name}</strong>
                </div>
                <div className="flex flex-row text-sm">
                  <div className="w-2.5 h-2.5 mt-1 mr-2 rounded-full bg-green"></div>
                  <p className="mr-3">
                    {msg.sender !== userId ? (
                      <em>{msg.sender_profile_name}:</em>
                    ) : (
                      <em>Vous :</em>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    <em>{msg.message}</em>
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-around mx-auto">
                {/* date */}
                <div className="bg-green text-white text-xs h-4 px-1 pt-0.5 rounded ">
                  {moment.utc(msg.date).local().startOf("seconds").fromNow()}
                </div>
                {/* Number of no read messages */}
                <div className="h-6 w-6 rounded-full bg-fragole text-white mx-auto">
                  <p className="text-center mt-0.5">6</p>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </aside>
      {/* Chat */}
      <div className="">
        <div className="flex flex-col md:w-[550px] lg:w-[880px] h-auto mr-6 p-4 bg-white rounded-3xl shadow-lg">
          <p className="text-center">
            Conversation avec{" "}
            {offer && offer.sender !== userId ? (
              <u>
                <strong>{offer && offer.sender_profile_name}</strong>
              </u>
            ) : (
              <u>
                <strong>{offer && offer.offer_owner_username}</strong>
              </u>
            )}{" "}
            à propos de{" "}
            <u>
              <strong>{offer && offer.cat_offer_name}</strong>
            </u>
          </p>
          <hr className="text-darkgray my-2"></hr>

          <div className="h-[550px] overflow-x-auto pr-2">
            <div className="text-center w-28 text-verydarkgray mx-auto mb-2">
              <p>Aujourd'hui</p>
            </div>
            {/* Right bubble */}
            {message.map((msg, index) => (
              <>
                {msg.sender === userId && (
                  <div key={msg.id} className="flex flex-row justify-end">
                    {/* <div className="w-auto h-2 bg-white"></div> */}
                    <div className="flex flex-col max-w-[480px] h-auto ">
                      <div className="flex flex-row mt-3 p-3 bg-fairpurple rounded-xl">
                        <p className=" max-w-96">{msg.message}</p>
                        <div className="flex flex-col items-end justify-center ml-3">
                          <img
                            src={msg.sender_profile.avatar}
                            className="h-12 w-12 ml-3 object-cover rounded-full"
                            alt={msg.sender_profile_name}
                          />
                        </div>
                      </div>
                      <p className="text-end text-verydarkgray mt-1 mr-2">
                        10:50
                      </p>
                    </div>
                  </div>
                )}
              </>
            ))}
            {/* Left bubble */}
            {message.map((msg, index) => (
              <>
                {msg.sender !== userId && (
                  <>
                    <div key={msg.id} className="flex flex-row max-w-[480px] h-auto mt-3 p-3 bg-gray rounded-xl">
                      <img
                        src={msg.sender_profile.avatar}
                        className="h-12 w-12 object-cover rounded-full"
                        alt={msg.sender.name}
                      />
                      <p className="ml-4 max-w-96">{msg.message}</p>
                    </div>
                    <p className=" text-verydarkgray mt-1 mr-2">14:50</p>
                  </>
                )}
              </>
            ))}
          </div>
        </div>
        {/* Messages input */}
        <div className="flex flex-row lg:w-[880px] h-10 mt-4 mb-auto mr-6 p-4 bg-white items-center rounded-3xl shadow-lg justify-between">
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
  );
}

export default MessageDetail;
