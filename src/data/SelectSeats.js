import "./style.css";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

export default function SelectSeats() {
	const { idSessao } = useParams();
	const [seats, setSeats] = React.useState([]);

	React.useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
		);
		promise.then((response) => {
			console.log(response.data);
			setSeats(response.data);
		});
	}, [idSessao]);
	return (
		<>
			<div className="head-title">Selecione o(s) assento(s)</div>
			<Footer />
		</>
	);
}
