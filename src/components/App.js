import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import MovieList from "../data/MovieList";
import SelectSessions from "../data/SelectSessions";
import SelectSeats from "../data/SelectSeats";
import Success from "../data/Success";

export default function App() {
	const orderData = {
		movieData: {},
		seatsData: {},
		buyerData: {},
	};

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<MovieList />} />
				<Route path="/sessoes/:idFilme" element={<SelectSessions />} />
				<Route
					path="/assentos/:idSessao"
					element={<SelectSeats orderData={orderData} />}
				/>
				<Route path="/sucesso" element={<Success orderData={orderData} />} />
			</Routes>
		</BrowserRouter>
	);
}
