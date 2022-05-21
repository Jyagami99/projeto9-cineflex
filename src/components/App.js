import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import MovieList from "../data/MovieList";
import SelectSessions from "../data/SelectSessions";
import SelectSeats from "../data/SelectSeats";

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<MovieList />} />
				<Route path="/sessoes/:idFilme" element={<SelectSessions />} />
				<Route path="/assentos/:idSessao" element={<SelectSeats />} />
			</Routes>
		</BrowserRouter>
	);
}
