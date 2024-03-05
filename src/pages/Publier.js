import add from '../assets/images/icons/add.png';

export default function Publier() {
  return (
    <div className='container flex flex-col'>
      <div className='flex flex-row'>
        <img src={add} alt="ajouter une annonce" width="20" height="20" />
        <h2 className="mx-auto mt-28 text-purple text-2xl">
          Ajoutez une annonce:
        </h2>
      </div>
      <div className="flex flex-row items-center place-items-center my-auto mx-auto">
        <div className='w-[500px] h-[600px] bg-white rounded-3xl shadow-xl mr-6'></div>
        <div className='w-[500px] h-[600px] bg-white rounded-3xl shadow-xl'></div>
      </div>
    </div>
  )
}
