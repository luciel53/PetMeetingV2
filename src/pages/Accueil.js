export default function Accueil() {

	return (
	  <main className="container flex flex-col mt-20 lg:w-[96rem] mx-auto">
		{/* Welcome Accueil */}
		<section className="flex flex-wrap md:flex-row justify-between">
		  {/* Lima picture */}
		  <div>
			  <img src={require("../assets/images/chat-bengal.png")} className="w-32 md:w-60 lg:w-80" alt="chat de race bengal" />
		  </div>
		  {/* Welcome bubble */}
		  <div className="w-[48%] mr-36 h-60 mt-16 p-8 bg-white shadow-lg rounded-full text-center">
			<div className="absolute left-45 bottom-[61%] w-10 h-6 bg-white shadow-sm"></div>
			  <h1 className="mt-0 mb-4 text-3xl text-purple">Bienvenue sur PetMeeting!</h1>
			  <p className="text-lg italic">
				"Cet outil est à disposition des éleveurs de chats pour les aider dans
				leur travail de sélection, en facilitant la mise en relation entre les
				éleveurs sérieux et passionnés. PetMeeting permet de trouver
				facilement une saillie extérieure de qualité proche de chez soi. Pour
				reproducteurs LOOF, sélectionnés, testés, vaccinés, etc..."
			  </p>

		  </div>
		  {/* BG de la semaine */}
		  <div className="container flex flex-col w-60 mt-10 lg:mr-20 border-2 shadow-lg">
			<div className="bg-yellow z-10 relative p-2 text-center font-semibold transform ">Le BG de la semaine</div>
			<img src="images/bg.png" alt="Le beau chat de la semaine" />
		  </div>
		</section>
		{/* Carousel */}
		<section>
		  <div>Carousel</div>
		</section>
	  </main>
	);
  }
