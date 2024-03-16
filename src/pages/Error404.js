import catbug from "../assets/images/400cat.gif";

export default function Error404() {
  return (
    <div className="flex flex-col mt-80">
      <p className="text-center text-xl">Erreur</p>
      <p className="text-center text-6xl">400Cat</p>
      <img
        src={catbug}
        className="object-none h-44 0 w-96 mx-auto"
        alt="Erreur 404"
      />
    </div>
  );
}
