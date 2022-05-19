import "./style.css";
import Header from "./Header/Header";
import MovieList from "../data/MovieList";

export default function App() {
	return (
		<>
			<Header />
			<div className="head-title">Selecione o filme</div>
			<MovieList />
		</>
	);
}
