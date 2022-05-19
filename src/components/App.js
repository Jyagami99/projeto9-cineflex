import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import MovieList from "../data/MovieList";
import SelectSchedule from "../data/SelectSchedule";

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<div className="head-title">Selecione o filme</div>
			<Routes>
				<Route path="/" element={<MovieList />} />
				<Route path="/sessoes/:idFilme" element={<SelectSchedule />} />
			</Routes>
		</BrowserRouter>
	);
}
