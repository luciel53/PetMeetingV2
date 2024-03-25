import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import Button from "../components/Button";
import lock from "../assets/images/icons/lock.png";
import userMini from "../assets/images/icons/user-mini.png";
import arobase from "../assets/images/icons/arobase.png";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Ce n'est pas le bon mot de passe");
        return error;
      }

      const newUser = { username, email, password };
      console.log(newUser);
      await axios.post('http://localhost:8000/register/', newUser);
      return <Navigate to='/login' />;
    } catch (err) {
      setError(err.response.data.error);
    }
  }

  console.log(handleSubmit);

  return (
    <div className="container flex flex-col justify-center mx-auto md:mx-auto w-[88%] md:w-[55%] lg:w-[30%] p-5 md:p-12 md:mt-60 lg:mt-48 bg-white rounded-3xl shadow-2xl text-sm md:text-lg animate-fade">
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg md:text-2xl text-darkdarkgray text-center pb-7">
          Créez un compte:
        </h2>
        <div className="flex flex-row items-center justify-center mx-8">
          <img src={userMini} className="absolute -ml-80 mb-4" alt="lock"></img>
          <input
            type="text"
            name="username"
            required
            placeholder="Nom d'utilisateur*"
            value = {username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 w-[90%] mb-4 pt-1 pl-10 border-b border-darkgray focus:outline-none"
          />
        </div>
        <div className="flex flex-row items-center justify-center mx-8">
          <img src={arobase} className="absolute -ml-80 mb-4" alt="lock"></img>
          <input
            type="email"
            name="email"
            required
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-[90%] mb-4 pt-1 pl-10 border-b border-darkgray focus:outline-none"
          />
        </div>
        <div className="flex flex-row items-center justify-center mx-8">
          <img src={lock} className="absolute -ml-80 mb-4" alt="lock"></img>
          <input
            type="password"
            name="password"
            required
            placeholder="Mot de passe*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-[90%] mb-4 pt-1 pl-10 border-b border-darkgray focus:outline-none"
          />
        </div>
        <div className="flex flex-row items-center justify-center mx-8">
          <img src={lock} className="absolute -ml-80 mb-4" alt="lock"></img>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirmer le mot de passe*"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 w-[90%] mb-4 pt-1 pl-10 border-b border-darkgray focus:outline-none"
          />
        </div>
        <Button text="Inscription" />
        <hr class="h-px my-8 bg-gray-200 border-0 bg-darkgray"></hr>
        <p className=" flex flex-row mx-auto">
          Vous avez déjà un compte?{" "}
          <NavLink to="/login" className="flex" aria-label="Page de connexion">
            <em className="text-fragole pl-2">Connectez-vous</em>
          </NavLink>
        </p>
      </form>
    </div>
  );
}
