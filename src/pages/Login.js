import React from 'react';
import Button from'../components/Button';


export default function Login () {
  return (
    <div className="container flex flex-col justify-center mx-auto w-[25%] mt-40 p-12 bg-white rounded-3xl shadow-lg text-lg">
      <label className='ml-4 mb-2'>
        Nom d'utilisateur*:
	    </label>
	    <input type="text" className='h-8 w-[90%] ml-4 mb-4 pt-1 pl-3 border border-darkgray rounded-lg bg-gray' />
	    <label className='ml-4 mb-2'>
          Mot de passe*:
	    </label>
	    <input type="text" className='h-8 w-[90%] ml-4 mb-4 pt-1 pl-3 border border-darkgray rounded-lg bg-gray' />
      <Button text="Connexion" />
      <hr class="h-px my-8 bg-gray-200 border-0 bg-darkgray"></hr>
      <p className='mx-auto'>Pas de compte? <em className='text-fragole'>Enregistrez-vous</em></p>
    </div>

  )
}
