import Carousel from '../components/Carousel';

export default function Accueil() {

	return (
	  <main className="container flex flex-col mt-20 lg:w-[96rem] mx-auto">
		{/* Welcome Accueil */}
		<section className="flex flex-wrap md:flex-row justify-between">
		  {/* Lima picture */}
		  <div className='md:w-44 lg:w-72'>
			  <img src={require("../assets/images/chat-bengal.png")} className="w-20 md:w-44 lg:w-[100%]" alt="chat de race bengal" />
		  </div>
		  {/* Welcome bubble */}
		  <div className="w-64 md:w-[40%] mr-8 lg:mr-36 lg:h-[60%] mt-0 md:mt-4 lg:mt-16 p-8 lg:p-2 bg-white shadow-lg rounded-3xl lg:rounded-full text-center">
			<div className="relative hidden lg:block lg:left-7 lg:top-52 lg:w-6 lg:h-5 bg-white shadow-sm"></div>
			  <h1 className="mt-0 mb-4 text-md md:text-md lg:text-3xl text-purple">Bienvenue sur PetMeeting!</h1>
			  <p className="text-sm md:text-xs lg:text-lg italic px-0 md:px-2 lg:px-6">
				"Cet outil est à disposition des éleveurs de chats pour les aider dans
				leur travail de sélection, en facilitant la mise en relation entre les
				éleveurs sérieux et passionnés. PetMeeting permet de trouver
				facilement une saillie extérieure de qualité proche de chez soi. Pour
				reproducteurs LOOF, sélectionnés, testés, vaccinés, etc..."
			  </p>
		  </div>
		  {/* BG de la semaine */}
		  <div className="container flex flex-col bg-cover w-60 lg:w-[320px] h-60 lg:h-[320px] mt-10 md:mt-4 lg:mt-8 lg:mr-28 border-2 shadow-2xl rounded-3xl mx-auto ml-24 md:ml-0">
			<div className="bg-yellow z-10 relative p-2 text-center font-semibold transform rounded-g-3xl rounded-t-3xl">Le BG de la semaine</div>
			<img src={require("../assets/images/bg.png")} className='z-0 max-h-[196px] lg:max-h-[276px] max-w-[196px] lg:max-width-[316px] justify-center mx-auto' alt="Le beau chat de la semaine" />
		  </div>
		</section>
		{/* Carousel */}
		<section className='mt-10 mb-10 lg:mt-0'>
		  <div><Carousel /></div>
		</section>
	  </main>
	);
  }
