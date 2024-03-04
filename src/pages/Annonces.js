import SearchBar from "../components/SearchBar";
import Grid from "../components/Grid";

export default function Annonces () {
	return (
		<div className="container flex flex-col mx-auto text-center mt-40">
			{/* SearchBar */}
			<SearchBar />
			{/* Selection */}
			<div></div>
			{/* Grid */}
			<Grid />
		</div>
	)
}
