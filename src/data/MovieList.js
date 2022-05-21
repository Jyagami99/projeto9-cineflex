import "./style.css";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Movies({ source, title, id }) {
	return (
		<Link to={`/sessoes/${id}`}>
			<div className="movie-box">
				<img src={source} alt={title} />
			</div>
		</Link>
	);
}

export default function MovieList() {
	const [movies, setMovies] = React.useState([]);

	React.useEffect(() => {
		const promise = axios.get(
			"https://mock-api.driven.com.br/api/v5/cineflex/movies"
		);
		promise.then((response) => {
			setMovies(response.data);
		});
	}, []);
	return (
		<>
			<div className="head-title">Selecione o filme</div>
			<div className="content">
				{movies.length === 0
					? "Carregando filmes"
					: // Colocar um gif para load
					  movies.map((movie, index) => (
							<Movies
								key={index}
								id={movie.id}
								source={movie.posterURL}
								title={movie.title}
							/>
					  ))}
			</div>
		</>
	);
}
