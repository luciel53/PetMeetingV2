import React, { useState } from "react";
import Button from "../components/Button";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("formData");
    console.log(formData);
    axios
      .post("http://localhost:8000/admin/contact/contact", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="container flex flex-col justify-center mx-auto md:mx-auto w-[88%] md:w-[55%] lg:w-[30%] p-5 md:p-12 md:mt-60 lg:mt-52 bg-white rounded-3xl shadow-2xl text-sm md:text-lg animate-fade">
      <form action="mailto:l.leroty@gmail.com" method="post" >
        <h2 className="text-lg md:text-2xl text-darkdarkgray text-center pb-7">
          Contactez-nous:
        </h2>
        <div className="flex flex-row items-center justify-center">
          <input
            type="text"
            name="name"
            required
            placeholder="Nom*"
            value={formData.name}
            onChange={handleChange}
            className="h-12 w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <input
            type="email"
            name="email"
            required
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className="h-12 w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <input
            type="text"
            name="topic"
            required
            placeholder="Sujet*"
            value={formData.topic}
            onChange={handleChange}
            className="h-12 w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <textarea
            type="text"
            name="message"
            required
            placeholder="Message*"
            value={formData.message}
            onChange={handleChange}
            className="h-28 w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
          />
        </div>
        <Button text="Envoyer" />
      </form>
    </div>
  );
}
