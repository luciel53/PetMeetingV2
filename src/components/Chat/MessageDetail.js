import { React, useState, useEffect } from "react";
import { NavLink, useLocation, useParams, useHistory, json } from "react-router-dom";
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
  const [wsSender, setWsSender] = useState("");
  const [chatMessage, setChatMessage] = useState({ message: "" });
  const [sentMessages, setSentMessages] = useState([]);

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
            try {
            // update the message state by adding the new message
            const newMessage = JSON.parse(event.data);
            console.log("websocket nouveau messsage", newMessage);

            // Check if newMessage is a valid JSON object
            // setWsSender(newMessage["sender"]);
            // let new_msg_user = newMessage["user"];
            // let new_msg_sender = newMessage["sender"];
            // let new_msg_receiver = newMessage["receiver"];
            // let new_msg_msg = newMessage["message"];
            // let new_msg_is_read = newMessage["is_read"];
            // let new_msg_cat_offer = newMessage["cat_offer"];

            setWebsocketMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log("All messages received from websocket::", websocketMessages);

          } catch (e) {
              console.error("error parsing JSON msg", e);
            }
          console.log("All messages received from websocket::", websocketMessages);

          });

          //Clean up websocket connection
          return () => {
            if (socket.readyState === 1) {
              socket.close();
              console.log("WEBSOCKET DISCONNECTED");
              setIsWebSocketConnected(false);
            }
          };
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

  // changes the state of the input chat message
  const handleChange = (event) => {
    setChatMessage({
      ...chatMessage,
      [event.target.name]: event.target.value,
    });
  };

  console.log("TEST>>>> user", userId);
  console.log("TEST>>>> sender", userId);
  console.log("TEST>>>> receiver", receiver_id);
  console.log("TEST>>>> message", chatMessage.message);
  console.log("TEST>>>> catoffer", typeof parseInt(cat_offer));

  // Send the message
  const sendMessage = () => {
    const cat_offer_id = parseInt(cat_offer);
    console.log(typeof cat_offer_id);
    const formData = new FormData();
    formData.append("user", userId);
    formData.append("sender", userId);
    formData.append("receiver", receiver_id);
    formData.append("message", chatMessage.message);
    formData.append("is_read", false);
    formData.append("cat_offer", cat_offer_id);

    try {
      axios.post(baseUrl + "send-messages/", formData).then((response) => {
        console.log(response.data);
        console.log(formData);
      });

      //Send it to the websocket server
      const socket = new WebSocket(`ws://127.0.0.1:8000/ws/messaging/`);

      socket.addEventListener("open", () => {
        console.log(" WEBSOCKET CONNECTED");
        setIsWebSocketConnected(true);
        // once websocket connection is established, send message
        const jsonMessage = {
          user: userId,
          sender: userId,
          receiver: receiver_id,
          message: chatMessage.message,
          is_read: false,
          cat_offer: cat_offer_id,
          // receiver_profile: receiver_profile.avatar,
          // sender_profile: sender_profile.avatar,
        };

        socket.send(JSON.stringify(jsonMessage));
        setSentMessages(jsonMessage);
        console.log("Message envoyé avec Websocket::", jsonMessage);
      });

      socket.addEventListener("error", (event) => {
        console.error(" WEBSOCKET ERROR", event);
        setIsWebSocketConnected(false);
      });

      // socket.addEventListener("message", (event) => {
      //   // update the message state by adding the new message
      //   const newMessage = JSON.parse(event.data);
      //   console.log("EVENTDATA", event.data);
      //   setWebsocketMessages((prevMessages) => [...prevMessages, newMessage]);
      //   console.log("Nouveau message reçu :", newMessage);
      // });

      //Clean up websocket connection
      return () => {
        if (socket.readyState === 1) {
          socket.close();
          console.log("WEBSOCKET DISCONNECTED");
          setIsWebSocketConnected(false);
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  console.log(chatMessage);

  // const all_messages = [...message, ...websocketMessages];
  // console.log("tous les msg:::", all_messages);

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

          <div className="flex flex-col h-[550px] overflow-x-auto pr-2">
            <div className="text-center w-28 text-verydarkgray mx-auto mb-2">
              <p>Aujourd'hui</p>
            </div>
            {/* Display the messages from database */}
            {message
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((msg, index) => (
                <div className="flex flex-col">
                  <div className={`flex flex-row ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
                    <div
                      key={msg.id}
                      className={`flex flex-row max-w-[480px] h-auto mt-3 p-3 rounded-xl ${
                        msg.sender === userId
                          ? " bg-fairpurple justify-end"
                          : "justify-start bg-midgray"
                      }`}
                    >
                      {msg.sender !== userId && (
                        <img
                          src={msg.sender_profile?.avatar}
                          className="h-12 w-12 object-cover rounded-full"
                          alt={msg.sender.name}
                        />
                      )}
                      <p
                        className={`ml-4 max-w-96 ${
                          msg.sender === userId ? "text-end" : ""
                        }`}
                      >
                        {msg.message}
                      </p>
                      {msg.sender === userId && (
                        <img
                          src={msg.sender_profile?.avatar}
                          className="h-12 w-12 object-cover rounded-full"
                          alt={msg.sender.name}
                        />
                      )}
                    </div>

                  </div>
                  <p
                    className={`text-verydarkgray mt-1 mr-2 ${
                      msg.sender !== userId ? "" : "text-end"
                    }`}
                  >
                    {moment(msg.date).format("HH:mm")}
                  </p>
                </div>
              ))}
              {/* Display the websocket messages */}
            {Array.isArray(websocketMessages) && (
              websocketMessages.map((msg, index) => (
                <div className="flex flex-col">
                  <div className={`flex flex-row ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
                    <div
                      key={index}
                      className={`flex flex-row max-w-[480px] h-auto mt-3 p-3 rounded-xl ${
                        msg.sender === userId
                          ? " bg-fairpurple justify-end"
                          : "justify-start bg-midgray"
                      }`}
                    >
                      {/* {msg.sender !== userId && (
                        <img
                          src={msg.sender_profile?.avatar}
                          className="h-12 w-12 object-cover rounded-full"
                          alt={msg.sender.name}
                        />
                      )} */}
                      <p
                        className={`ml-4 max-w-96 ${
                          msg.sender === userId ? "text-end" : ""
                        }`}
                      >
                        {msg.message}
                      </p>
                      {/* {msg.sender === userId && (
                        <img
                          src={msg.sender_profile?.avatar}
                          className="h-12 w-12 object-cover rounded-full"
                          alt={msg.sender.name}
                        />
                      )} */}
                    </div>

                  </div>
                  <p
                    className={`text-verydarkgray mt-1 mr-2 ${
                      msg.sender !== userId ? "" : "text-end"
                    }`}
                  >
                    {moment(msg.date).format("HH:mm")}
                  </p>
                </div>
              )))}
          </div>
        </div>
        {/* Messages input */}
        <div className="flex flex-row lg:w-[880px] h-10 mt-4 mb-auto mr-6 p-4 bg-white items-center rounded-3xl shadow-lg justify-between">
          <textarea
            type="text"
            name="message"
            value={chatMessage.message}
            onChange={handleChange}
            placeholder="Tapez votre message ici..."
            className="form-control w-[70%] h-6 pl-3  outline-none bg-white resize-none"
          />
          <img
            src={addimage}
            className="w-12 mt-1 hover:animate-wiggle-more"
            alt="Ajouter"
          />
          <div className="-mt-3 -mr-4 hover:opacity-80">
            <Button onClick={sendMessage} text="Envoyer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageDetail;
