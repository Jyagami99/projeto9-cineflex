import "./style.css";
import { Link, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";

function Sessions({ weekday, date, showtimes }) {
	return (
		<div className="session-date">
			<span>
				{weekday} - {date}
			</span>
			{showtimes.map((showtime, index) => (
				<Link to={`/assentos/${showtime.id}`} key={index}>
					<div className="buttons">{showtime.name}</div>
				</Link>
			))}
		</div>
	);
}

function Footer() {
	const [poster, setPoster] = React.useState([]);
	const { idFilme } = useParams();

	React.useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
		);
		promise
			.then((response) => {
				console.log(response.data);
				setPoster(response.data);
			})
			.catch((err) => console.log(err));
	}, [idFilme]);

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
						<span className="footer-title">{poster.title}</span>
					</>
				)}
			</div>
		</footer>
	);
}

export default function SelectSessions() {
	const { idFilme } = useParams();
	const [days, setDays] = React.useState([]);

	React.useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
		);
		promise
			.then((response) => {
				setDays(response.data.days);
			})
			.catch((err) => console.log(err));
	}, [idFilme]);
	return (
		<>
			<div className="head-title">Selecione o horário</div>
			<div className="schedules">
				{days.length === 0
					? "Carregando sessões"
					: // Colocar um gif para load
					  days.map((day, index) => (
							<Sessions
								key={index}
								weekday={day.weekday}
								date={day.date}
								showtimes={day.showtimes}
							/>
					  ))}
				<Footer />
			</div>
		</>
	);
}
