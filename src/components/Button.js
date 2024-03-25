export default function Button ({text}) {
  return (
    <div className=" bg-fragole z-30 w-36 h-10 p-2 mt-5 mb-2 mx-auto text-center rounded-3xl shadow-xl hover:opacity-85 hover:animate-rotate-x">
      <button type="submit" className=" text-white">{text}</button>
    </div>
  );
}
