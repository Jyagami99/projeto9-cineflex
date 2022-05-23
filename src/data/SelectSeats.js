import "./style.css";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
	const [selectedSeats, setSelectedSeats] = React.useState([]);
	const [name, setName] = React.useState("");
	const [cpf, setCpf] = React.useState("");
	const navigate = useNavigate();

	function submitForm(event) {
		event.preventDefault();
		const data = {
			ids: selectedSeats,
			name: name,
			cpf: cpf,
		};

		console.log(data);

		const promise = axios.post(
			`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`,
			data
		);
		promise
			.then((response) => {
				navigate("/sucesso");
			})
			.catch((err) => console.log(err));
	}

	function Seats({ id, name, isAvailable, selectedSeats, setSelectedSeats }) {
		const toggleSelection = () => {
			if (!isAvailable) {
				alert("Esse assento não está disponível");
			} else {
				const selectedSeatIndex = selectedSeats.indexOf(id);

				if (selectedSeatIndex > -1) {
					selectedSeats.splice(selectedSeatIndex, 1);
				} else {
					selectedSeats.push(id);
				}

				setSelectedSeats([...selectedSeats]);
			}
		};

		return (
			<>
				<div
					className={`${isAvailable ? "available	" : "unavailable"} ${
						selectedSeats.indexOf(id) > -1 ? "selected" : ""
					}`}
					onClick={toggleSelection}
				>
					{name}
				</div>
			</>
		);
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
								id={seat.id}
								name={seat.name}
								isAvailable={seat.isAvailable}
								selectedSeats={selectedSeats}
								setSelectedSeats={setSelectedSeats}
							/>
					  ))}
			</div>
			<div className="content seats">
				<div className="selected"></div>
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
					<label htmlFor="nome">Nome do comprador</label>
					<input
						type="text"
						name="nome"
						placeholder="Digite seu nome..."
						onChange={(e) => setName(e.target.value)}
						value={name}
						required
					/>
					<label htmlFor="nome">CPF do comprador</label>
					<input
						type="text"
						name="cpf"
						placeholder="Digite seu CPF..."
						onChange={(e) => setCpf(e.target.value)}
						value={cpf}
						maxLength="11"
						required
					/>

					<button type="submit">Reservar assento(s)</button>
				</form>
			</div>
			<Footer />
		</>
	);
}
