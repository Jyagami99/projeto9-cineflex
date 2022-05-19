import "./style.css";
import React from "react";
import axios from "axios";

function Movies(source, title) {
	return (
		<div className="movie-box">
			<img src={source} alt={title} />
		</div>
	);
}

export default function MovieList() {
	const [movies, setMovies] = React.useState([]);

	React.useEffect(() => {
		const promise = axios.get(
			"https://mock-api.driven.com.br/api/v5/cineflex/movies"
		);
		promise.then((response) => {
			setMovies([...response.data]);
		});
	}, []);
	return (
		<div className="content">
			{movies.length === 0
				? "Carregando filmes"
				: // Colocar um gif para load
				  movies.map((movie) => (
						<Movies
							key={movie.id}
							source={movie.posterURL}
							title={movie.title}
						/>
				  ))}
		</div>
	);
}
