import add from '../assets/images/icons/add.png';

export default function Publier() {
  return (
    <div className='container flex flex-col mx-auto'>
      <div className='container flex flex-row mx-auto mb-6'>
        <img src={add} className='mt-28 z-2 w-6 h-6 ml-auto' alt="ajouter une annonce" />
        <h2 className="pl-3 mt-28 mr-auto text-purple text-2xl">
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
