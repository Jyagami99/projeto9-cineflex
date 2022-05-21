import "./style.css";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Sessions({ weekday, date, showtimes }) {
	return (
		<div className="session-date">
			<span>
				{weekday} - {date}
			</span>
			{showtimes.map((showtime, index) => (
				<div key={index}>{showtime.name}</div>
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
		promise.then((response) => {
			setPoster(response.data);
		});
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
	const [sessions, setSessions] = React.useState([]);

	React.useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
		);
		promise.then((response) => {
			setSessions(response.data.days);
		});
	}, [idFilme]);
	return (
		<>
			<div className="head-title">Selecione o horário</div>
			<div className="schedules">
				{sessions.length === 0
					? "Carregando sessões"
					: // Colocar um gif para load
					  sessions.map((session, index) => (
							<Sessions
								key={index}
								weekday={session.weekday}
								date={session.date}
								showtimes={session.showtimes}
							/>
					  ))}
				<Footer />
			</div>
		</>
	);
}
