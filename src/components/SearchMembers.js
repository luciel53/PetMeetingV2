import GlassSearchButton from "../components/GlassSearchButton";
import Grid from "../components/Grid";

export default function SearchMembers() {
  return (
    <div>
      <div className="flex flex-row bg-white rounded-full md:w-1/4 h-16 border-fragole border mx-auto shadow-lg md:text-xs lg:text-lg animate-fade animate-delay-100">
        <input
          type="text"
          className="rounded-full w-3/4 pl-6 italic outline-none"
          placeholder="Chercher un membre"
        />
        <div className="ml-[12%]">
          <GlassSearchButton className="" />
        </div>
      </div>
      <div>
        <Grid />
      </div>
    </div>
  );
}
