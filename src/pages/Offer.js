import profileMsg from "../assets/images/icons/profileMsg.png";
import profileCard from "../assets/images/icons/profileCard.png";
import minicat from "../assets/images/icons/minicat.png";
import warning from "../assets/images/icons/warning.png";
import male from "../assets/images/icons/male.png";
import female from "../assets/images/icons/female.png";

export default function Offer() {
  return (
    <div className="mx-auto">
      <div className="container flex flex-row col-end-4 mt-36 mb-32">
        {/* Owner */}
        <div className="container flex flex-col w-[250px] h-[263px] mr-6 bg-white rounded-3xl shadow-lg">
          <p className="mx-auto mt-3 font-semibold text-lg">Name</p>
          <div className="container w-[175px] h-[183px] bg-gray rounded-full mx-auto my-auto mt-2 shadow-sm z-0"></div>
          <div className="flex flex-row">
            <div className="ml-6">
              <img src={profileCard} className="h-8" alt="profil" />
            </div>
            <div className="ml-36 z-20 pb-5">
              <img
                src={profileMsg}
                className="mt-1 h-6.5"
                alt="envoyer un message"
              />
            </div>
          </div>
        </div>
        {/* Offer Details */}
        <div className="flex flex-col">
          {/* Title (name), date and price */}
          <div className="container flex flex-row flex-wrap bg-white w-[450px] pl-6 pt-4 h-auto mr-6 mx-auto rounded-3xl shadow-lg">
            {/* Cat icon + title */}
            <div className="flex flex-row w-1/2 mb-5">
              <img src={minicat} className="w-8 h-8 pb-1" alt="icone de chat" />
              <h3 className="text-2xl pl-2 font-semibold">Nom</h3>
            </div>
            <div className="flex flex-col w-1/2 pl-12 pt-1">
              <div className="flex flex-row items-center">
                <small className="">01/02/2024 20:58</small>
                <img src={warning} className="mr-4" alt="signaler l'annonce" />
              </div>
              <strong className="text-2xl">500€</strong>
            </div>

            {/* Details */}
            <div className="flex flex-row pb-5">
              <div className="flex flex-col">
                <div>
                  <table className="text-lg ml-5 leading-8">
                    <tr>
                      <td className="text-purple">Sexe:</td>
                      <td className="pl-7">
                        <img src={male} alt="mâle" />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-purple">LOOF:</td>
                      <td className="pl-8">Oui</td>
                    </tr>
                    <tr>
                      <td className="text-purple">Localisation:</td>
                      <td className="pl-8">Loire-Atlantique</td>
                    </tr>
                    <tr>
                      <td className="text-purple">Groupe sanguin:</td>
                      <td className="pl-8">B</td>
                    </tr>
                    <tr>
                      <td className="text-purple">Tests maladies:</td>
                      <td className="pl-8">fiv/felv, PRA, PKdef</td>
                    </tr>
                    <tr>
                      <td className="text-purple">Vaccins à jour:</td>
                      <td className="pl-8">Oui</td>
                    </tr>
                    <tr>
                      <td className="text-purple">N° d’identification:</td>
                      <td className="pl-8">1682956689965</td>
                    </tr>
                    <tr>
                      <td className="text-purple">Couleur des yeux:</td>
                      <td className="pl-8">Or</td>
                    </tr>
                    <tr>
                      <td className="text-purple">Robe:</td>
                      <td className="pl-8">Fawn</td>
                    </tr>
                    <tr>
                      <td className="text-purple">Age:</td>
                      <td className="pl-8">3 ans</td>
                    </tr>
                    <tr>
                      <td className="text-purple">Qualités:</td>
                      <td className="pl-8 pr-5" style={{ wordBreak: 'break-word' }}>Gentil, beau type</td>
                    </tr>
                    <tr>
                      <td className="text-purple">Défauts:</td>
                      <td className="pl-8 pr-5" style={{ wordBreak: 'break-word' }}>Collantjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</td>
                    </tr>
                    <tr>
                      <td className="text-purple">Autres:</td>
                      <td className="pl-8 pr-5" style={{ wordBreak: 'break-word' }}>A déjà produit</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pictures */}
        <div className="container bg-white w-[450px] h-[400px] mx-auto rounded-3xl shadow-lg"></div>
      </div>
    </div>
  );
}
