import "./style.css";
import { Link, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import Footer from "./Footer";

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
