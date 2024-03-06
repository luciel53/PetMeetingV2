import cats from "./Cats";

export default function Grid() {
  console.log(cats);

  return (
    <div className="grid grid-cols-2 place-content-center md:max-w-max md:mx-auto md:grid-cols-3 lg:grid-cols-4 mt-12">
      {cats.map((cat, index) =>
      <div key={index} className="vignette flex flex-col justify-center items-center text-center bg-white z-0 md:h-96 w-72 mx-auto mr-3 mt-3 pb-2 rounded-3xl shadow-xl">
        <p className="text-center text-lg font-semibold mt-3">{cat.name}</p>
        <img
          src={cat.image}
          className="z-20 h-40 md:h-72 my-3 object-cover mx-auto"
          alt={cat.name}
        />
        <p className="text-center font-semibold mb-1">{cat.race}</p>
      </div>
      )}
    </div>
  );
}
