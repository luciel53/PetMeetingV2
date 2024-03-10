import search from '../assets/images/icons/search.png';

export default function GlassSearchButton() {
  return (
    <div>
      <button
        type="button"
        className="bg-fragole text-white lg:text-xl p-3.5 rounded-full shadow-lg hover:opacity-85"
      >
        <img src={search} className=" hover:animate-spin" alt="search" />
      </button>
    </div>
  );
}
