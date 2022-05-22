import "./style.css";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

function Seats({ name, isAvailable }) {
	return (
		<>
			{isAvailable === true ? (
				<div className="available">{name}</div>
			) : (
				<div className="unavailable">{name}</div>
			)}
		</>
	);
}

export default function SelectSeats() {
	const { idSessao } = useParams();
	const [seats, setSeats] = React.useState([]);

	React.useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
		);
		promise
			.then((response) => {
				console.log(response.data);
				setSeats([...response.data.seats]);
			})
			.catch((err) => console.log(err));
	}, [idSessao]);

	return (
		<>
			<div className="head-title">Selecione o(s) assento(s)</div>
			<div className="content seats">
				{seats.length === 0
					? "Carregando assentos..."
					: seats.map((seat, index) => (
							<Seats
								key={index}
								name={seat.name}
								isAvailable={seat.isAvailable}
							/>
					  ))}
			</div>
			<div className="">
				<div className="available"></div>
				<div className="unavailable"></div>
			</div>
			<Footer />
		</>
	);
}