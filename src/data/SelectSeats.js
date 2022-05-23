import "./style.css";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

function Footer() {
	const [poster, setPoster] = React.useState([]);
	const [name, setName] = React.useState([]);
	const [day, setDay] = React.useState([]);
	const { idSessao } = useParams();

	React.useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
		);
		promise
			.then((response) => {
				console.log(response.data);
				setPoster(response.data.movie);
				setName(response.data);
				setDay(response.data.day);
			})
			.catch((err) => console.log(err));
	}, [idSessao]);

	return (
		<footer>
			<div className="footer-content">
				{poster.length === 0 ? (
					"carregando..."
				) : (
					// Colocar um gif para load
					<>
						<div className="footer-image">
							<img src={poster.posterURL} alt={poster.title} />
						</div>
						<div>
							<span className="footer-title">{poster.title}</span>
							<br />
							<span className="footer-title">
								{day.weekday} - {name.name}
							</span>
						</div>
					</>
				)}
			</div>
		</footer>
	);
}

export default function SelectSeats() {
	const { idSessao } = useParams();
	const [seats, setSeats] = React.useState([]);
	const [name, setName] = React.useState("");
	const [cpf, setCpf] = React.useState("");

	function submitForm(event) {
		event.preventDefault();
		const data = {
			name: name,
			cpf: cpf,
		};

		console.log(data);
	}

	React.useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
		);
		promise
			.then((response) => {
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
			<div className="content seats">
				<div className="selecionado"></div>
				<div className="available"></div>
				<div className="unavailable"></div>
			</div>
			<div className="content seats">
				<div>Selecionado</div>
				<div>Disponivel</div>
				<div>Indisponivel</div>
			</div>
			<div className="input">
				<form onSubmit={submitForm}>
					<div>Nome do comprador</div>
					<input
						type="text"
						placeholder="Digite seu nome..."
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
					<div>CPF do comprador</div>
					<input
						type="text"
						placeholder="Digite seu CPF..."
						onChange={(e) => setCpf(e.target.value)}
						value={cpf}
					/>

					<button type="submit">Reservar assento(s)</button>
				</form>
			</div>
			<Footer />
		</>
	);
}
