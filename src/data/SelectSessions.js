import "./style.css";
import { Link, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import Footer from "./Footer";

function Sessions({ weekday, date, showtimes, id }) {
	return (
		<div className="session-date">
			<span>
				{weekday} - {date}
			</span>
			<Link to={`/assentos/${id}`}>
				{showtimes.map((showtime, index) => (
					<div className="buttons" key={index}>
						{showtime.name}
					</div>
				))}
			</Link>
		</div>
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
								id={session.id}
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
