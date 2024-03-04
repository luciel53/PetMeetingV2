import Button from '../components/Button';

const races = {
	
}

export default function SearchBar() {
  return (
    <div>
      <div className=" flex flex-row bg-white rounded-full md:w-[950px] h-16 border-fragole border mx-auto shadow-lg">
      <select className="bg-white ml-5 rounded-full outline-none">
        <option value="" className="text-center">Sexe</option>
		<option>Mâle</option>
		<option className="">Femelle</option>
	  </select>
	  <select className="bg-white ml-5 rounded-full outline-none">
		<option value="" className="text-center">Race</option>
		<option value="Abyssin">Abyssin</option>
		<option value="Siamois">Siamois</option>
		<option value="Bengal">Bengal</option>
		<option value="British Shorthair">British Shorthair</option>
		<option value="British Longhair">British Longhair</option>
		<option value="Scottish fold">Scottish fold</option>
		<option value="Ragdoll">Ragdoll</option>
	  </select>
	  <select className="bg-white ml-5 rounded-full outline-none">
		<option value="" className="text-center">Couleur des yeux</option>
		<option value="verts">Verts</option>
		<option value="bleus">Bleus</option>
		<option value="Or">Or</option>
		<option value="vairons">Vairons</option>
	  </select>
	  <select className="bg-white ml-5 rounded-full outline-none">
		<option value="Groupe sanguin" className="text-center">Groupe sanguin</option>
		<option value="A">A</option>
		<option value="B">B</option>
		<option value="AB">AB</option>
	  </select>
	  <select className="bg-white ml-5 rounded-full outline-none">
		<option value="" className="text-center">Région</option>
		<option value="Loire-Atlantique">Loire-Atlantique</option>
		<option value="Dordogne">Dordogne</option>
	  </select>
	  <button type="button" className='bg-fragole text-white text-xl w-40 rounded-full ml-16'>Rechercher!</button>


	  </div>
	</div>
  )
}
