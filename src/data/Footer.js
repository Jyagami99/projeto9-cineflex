import "./style.css";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Footer() {
	const [poster, setPoster] = React.useState([]);
	const { idFilme } = useParams();

	React.useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`
		);
		promise.then((response) => {
			console.log(response.data);
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
