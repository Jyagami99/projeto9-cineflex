import "./style.css";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Sessions() {
	return <div>Koeee</div>;
}

export default function SelectSessions() {
	const { idFilme } = useParams();
	const [sessions, setSessions] = React.useState([]);

	React.useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
		);
		promise.then((response) => {
			console.log(response.data.days);
			setSessions(response.data.days);
		});
	}, [idFilme]);
	return (
		<>
			<div className="head-title">Selecione o horário</div>
			<div className="content">
				{sessions.length === 0
					? "Carregando sessões"
					: // Colocar um gif para load
					  sessions.map((session) => <Sessions key={session.id} />)}
			</div>
		</>
	);
}
